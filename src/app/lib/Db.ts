import mysql from "mysql2/promise";
import { errors } from "./Errors";


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

      const queryString = `INSERT INTO userMovies (userId, movieId, ${conditions[listType]}) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE ${conditions[listType]} = VALUES(${conditions[listType]})`

      await this.dbConnection?.execute(queryString, [userId, movieId, assessment]);
    } catch (err) {
      console.error("DB insert error:", err);
      throw new Error("Failed to post to DB")
    }
  }
}