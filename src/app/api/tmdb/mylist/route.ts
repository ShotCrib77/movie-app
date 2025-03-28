import { errors } from "@/app/lib/Errors";
import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY;
const TMDB_PATH = process.env.TMDB_PATH;

export async function POST(req: Request) {
  try {
    const { movieIdList } = await req.json();

    if (!movieIdList || !Array.isArray(movieIdList)) {
      return NextResponse.json({ error: errors.input_nan }, { status: 400 });
    }

    const moviesData = await Promise.all(
      movieIdList.map(async (id: number) => {
        const res = await fetch(`${TMDB_PATH}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
        if (!res.ok) {
          throw new Error(`HTTP error for ID ${id}: ${res.status}`);
        }
        return await res.json();
      })
    );
    
    return NextResponse.json({ movies: moviesData });
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
