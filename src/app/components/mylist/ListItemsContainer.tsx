"use client";

import { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { reformatDataLists } from "@/app/functions/functions";

interface ListItemsContainerProp {
  listType: "hw" | "wl";
}

interface CategoryData {
  id: number;
  posterPath: string;
  movieTitle: string;
  releaseDate: string;
  voteAverage: number;
}

export default function ListItemsContainer({listType}: ListItemsContainerProp) {
  const [reformattedMovieData, setReformattedMovieData] = useState<CategoryData[] | null>(null);
  const [movieIds, setMovieIds] = useState<number[]>()
  const movieIdsRef = useRef<number[]>(null);

  useEffect(() => {
    const getIds = async() => {
      const movieIdFetchRes = await fetch(`/api/movies?userId=1&listType=${listType}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const movieIdsRes = await movieIdFetchRes.json();
      console.log(movieIdsRes.movies)
      setMovieIds(movieIdsRes.movies)
      movieIdsRef.current= movieIdsRes.movies;
    }

    const getMovies = async() => { 
      await getIds()
      setReformattedMovieData(null);
      try {
        const movieFetchRes = await fetch(`/api/tmdb/mylist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movieIdList: movieIdsRef.current
          }),
        });
        const reformatData: CategoryData[] = reformatDataLists(await movieFetchRes.json());
        console.log("reformatted", reformatData);
        setReformattedMovieData(reformatData);
      } catch (err) {
        console.error(`Error fetching movies`, err);
        return [];
      }
    }
    getMovies()
  }, [listType])

  return (
    <section className="w-full flex flex-col items-center gap-4 justify-center">
      {reformattedMovieData ? (
        reformattedMovieData.map((movie) => 
          <ListItem 
            key={movie.id}
            listType={listType}
            priority={"High"}
            movieId={movie.id}
            posterPath={movie.posterPath}
            movieTitle={movie.movieTitle}
            releaseDate={movie.releaseDate} 
            rating={movie.voteAverage}  
          />
        )
      ): (
        <span className="loading loading-spinner my-12"/>
      )}
    </section>
  );
}