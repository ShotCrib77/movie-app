import { NextRequest, NextResponse } from "next/server";
import { errors } from "@/app/lib/Errors";
import { MovieDb } from "@/app/lib/Db";

export async function GET(req: NextRequest) {
  const movieDb = new MovieDb();
  try {
    await movieDb.Connect(); 

    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));
    const listType = searchParams.get("listType") as "hw" | "wl" | "" | null;

    if (!userId) {
      return NextResponse.json({ error: errors.input_nan }, { status: 400 });
    }

    const movieIds = await movieDb.GetMovieIds(userId, listType || "");

    console.log("Returning movie Ids", movieIds);

    return NextResponse.json({ movies: movieIds });

  } catch (error) {
    console.error("Error in GET /api/movies: ", error);
    return NextResponse.json({ error: errors.bad_gateway }, { status: 500 });
  } finally {
    movieDb.Disconnect();
  }
}

export async function POST(req: NextRequest) {
  const movieDb = new MovieDb();
  try {
    await movieDb.Connect();

    const body = await req.json();
    const { userId, movieId, listType, assessment } = body;

    console.log(userId, movieId, listType, assessment)

    if (!userId || !movieId || !listType) {
      return NextResponse.json({ error: errors.result_null }, { status: 400 });
    }

    await movieDb.AddMovieId(userId, movieId, listType, assessment);
    
    return NextResponse.json({ message: "Movie added successfully" });

  } catch (error) {
    console.error("Error in POST /api/movies: ", error);
    return NextResponse.json({ error: errors.bad_gateway }, { status: 500 });
  } finally {
    movieDb.Disconnect();
  }
}
