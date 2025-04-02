import { NextRequest, NextResponse } from "next/server";
import { errors } from "@/app/lib/Errors";
import { MovieDb } from "@/app/lib/Db";

export async function POST(req: NextRequest) {
  const movieDb = new MovieDb();
  
  try {
    await movieDb.Connect();

    const { username, email, password }= await req.json();

    if (!username || !email || !password  ) {
      return NextResponse.json({ error: errors.input_nan }, { status: 400 });
    }

    await movieDb.AddUser(username, email, password);

    return NextResponse.json({ message: "User added successfully" });
  } catch (err) {
    console.error("Error in POST /api/movies:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    movieDb.Disconnect();
  }
}