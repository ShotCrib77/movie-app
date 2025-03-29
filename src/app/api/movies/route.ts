import { NextRequest, NextResponse } from "next/server";
import { errors } from "@/app/lib/Errors";
import { MovieDb } from "@/app/lib/Db";
import { revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
  const movieDb = new MovieDb();
  try {
    await movieDb.Connect(); 

    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));
    const listType = searchParams.get("listType") as "hw" | "wl";

    if (!userId || !listType) {
      return NextResponse.json({ error: errors.input_nan }, { status: 400 });
    }

    const movieDbObject = await movieDb.GetMovieIds(userId, listType);
    const movieIds = movieDbObject.map(movie => movie.movieId);

    console.log("Returning movie Ids", movieIds);

    return NextResponse.json({ movies: movieDbObject });

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

    if (!userId || !movieId || !listType) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const oldMovies = await movieDb.GetMovieIds(userId, listType);
    const oldMovieIds = oldMovies.map(movie => movie.movieId);
    const alreadyExists = oldMovieIds.includes(movieId);

    await movieDb.AddMovieId(userId, movieId, listType, assessment);

    const removedIds = oldMovieIds.filter((id) => id !== movieId);
    removedIds.forEach((id) => revalidateTag(`movie-${id}`));

    if (!alreadyExists) {
      revalidateTag(`movie-${movieId}`);
    }

    return NextResponse.json({ message: "Movie updated successfully" });
  } catch (error) {
    console.error("Error in POST /api/movies:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    movieDb.Disconnect();
  }
}