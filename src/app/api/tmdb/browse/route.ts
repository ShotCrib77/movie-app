import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY;
const TMDB_PATH = process.env.TMDB_PATH;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const genreId = searchParams.get("genreId");

  try {
    let url = "";

    if (id) {
      url = `${TMDB_PATH}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`;
    } else if (genreId) {
      url = `${TMDB_PATH}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&with_original_language=en&include_adult=false&language=en-US`;
      console.log("GENRE url: ", url)
    } else {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
