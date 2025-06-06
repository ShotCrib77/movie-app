import mysql from "mysql2/promise";
import { errors } from "./Errors";
import bcrypt from "bcryptjs";


//FIX throw errors
export abstract class Db {
  protected dbConnection: mysql.Connection | undefined;

  public async Connect() {
    if (this.dbConnection) {
      throw new Error(errors.already_connected);
    }

    this.dbConnection = await mysql.createConnection({ // ENV no work :(
      host: "localhost",
      user: "root",
      database: "user_ratings_and_lists",
      password: "password"
    });

    await this.dbConnection.connect();
  }

  public Disconnect() {
    if (!this.dbConnection) {
      throw new Error(errors.not_connected);
    }

    this.dbConnection.destroy();
  }
}

export class MovieDb extends Db {

  public constructor() {
    super();
  }

  public async GetMovieIds(userId: number, listType: "hw" | "wl" | "" = ""): Promise<{ movieId: number; assessment: number }[]> { // listType => What list the movie is on - "Watch later" or "Have watched"
    try {
      if (!this.dbConnection) throw new Error("Database connection not available");

      const conditions: Record<string, string> = {
        hw: "AND priority IS NULL",
        wl: "AND priority IS NOT NULL"
      };
      
      const queryString = `SELECT movieId, rating, priority FROM userMovies WHERE userId = ? ${conditions[listType] || ""}`;

      const [rows]: any =  await this.dbConnection?.execute(queryString, [userId]);
      console.log("rows:", rows);

      return rows.map((row: { movieId: number; rating: number | null, priority: number | null }) => ({
        movieId: row.movieId,
        assessment: row.rating ?? row.priority,
      }));

    } catch (err) {
      console.error("Error in GetMovieIds:", err);
      throw new Error("Failed to fetch data")
    }
  }
  
  public async AddMovieId(userId: number, movieId: number, listType: "hw" | "wl", assessment: null | number = null) { // assessment => ranking/priority
    try {
      if (!this.dbConnection) throw new Error("Database connection not available");

      const conditions: Record<string, string> = {
        hw: "rating",
        wl: "priority"
      };
      
      if (!(listType in conditions)) {
        throw new Error(`Invalid list type: ${listType}`);
      }
      
      const currentColumn = conditions[listType];

      const otherColumn = Object.entries(conditions) // Columnen som *inte* motsvarar den för conditions(listType) (så "rating" ifall currentColumn "priority" och "priority" ifall currentColumn är "rating")
        .find(([key]) => key !== listType)?.[1];
      
      const queryString = `
        INSERT INTO userMovies (userId, movieId, ${currentColumn})
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
          ${currentColumn} = VALUES(${currentColumn})
          ${otherColumn ? `, ${otherColumn} = NULL` : ""}
      `; //Ifall man "rate:ar" en film som redan finns i en lista så kommer dens rating uppdateras och listan "bytas".
      
      await this.dbConnection?.execute(queryString, [userId, movieId, assessment]);
    } catch (err) {
      console.error("DB insert error:", err);
      throw new Error("Failed to post to DB")
    }
  }

  public async AddUser(username: string, email: string, password: string) {
    try {
      const hashedPassword = await this.hashPassword(password);

      const date = new Date();
      const sqlDate = date.toISOString().split("T")[0];

      console.log(username, email, sqlDate, hashedPassword)

      const queryString = `INSERT INTO users (username, email, creationDate, password_hash) VALUES (?, ?, ?, ?)`

      await this.dbConnection?.execute(queryString, [username, email, sqlDate, hashedPassword]);
    } catch(err) {
      console.error("Error adding new user into the DB", err)
      throw new Error("Failed to post to DB")
    }
  }

  public async VerifyUser(username: string, password: string) {
    try {
      const queryString = `SELECT password_hash, userId FROM users WHERE username = ?`

      const [rows]: any = await this.dbConnection?.execute(queryString, [username]);
      const passwordHash = rows[0]?.password_hash;
      const userId = rows[0]?.userId;

      const isMatch = await this.comparePasswords(passwordHash, password);

      if (!isMatch) {
        throw new Error("Wrong password or username")
      }

      return {userId: userId, username: username};

    } catch(err) {
      console.error("Error logging in", err)
      throw new Error("Error logging in")
    }
  }

  public async RemoveMovieId(userId: number, movieId: number) {
    try {
      if (!this.dbConnection) throw new Error("Database connection not available");

      const queryString = `DELETE FROM userMovies WHERE userId = ? AND movieId = ?`;

      await this.dbConnection?.execute(queryString, [userId, movieId]);
    }
    catch (err) {
      console.error("Error removing movieId from DB", err)
      throw new Error("Failed to remove movieId from DB")
    }
  }
  
  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  public async comparePasswords(storedHash: string, inputPassword: string) {
     return await bcrypt.compare(inputPassword, storedHash);
  }
}