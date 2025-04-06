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
  const [assessmentMap, setAssessmentMap] = useState<Map<number, number>>(new Map());
  const movieIdsRef = useRef<number[]>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null)
  const userIdRef = useRef<string | null>(null)

  useEffect(() => {
    const getUserId = async () => {
      try {
      const res = await fetch("/api/isloggedin");
      const data = await res.json();
      if (res.ok && data.isLoggedIn) {
        userIdRef.current= data.userId;
        setUserId(data.userId);
      } else {
        setLoading(false);
      }
      } catch (err) {
        console.error("Error checking login: ", err)
      }
    }

    const getIdsAndRating = async () => {
      await getUserId()
      if (userIdRef.current) {
        const movieIdFetchRes = await fetch(`/api/movies?userId=${userIdRef.current}&listType=${listType}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        const movieIdsRes = await movieIdFetchRes.json();
        const idsOnly = movieIdsRes.movies.map((movie: { movieId: number }) => movie.movieId);
        const assessmentMapFetch: Map<number, number> = new Map(movieIdsRes.movies.map((movie: { movieId: number, assessment: number }) => [movie.movieId, movie.assessment]));
        setMovieIds(idsOnly);
        setAssessmentMap(assessmentMapFetch);
        movieIdsRef.current = idsOnly;
      }
    }

    const getMovies = async () => { 
      setLoading(true);
      await getIdsAndRating();
      setReformattedMovieData(null);
      if (userIdRef.current && movieIdsRef.current) {
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
        } finally {
          setLoading(false);
        }
      }
    }
    getMovies();
  }, [listType])

  return (
    <section className="w-full flex flex-col items-center gap-4 justify-center">
      {loading ? (
        <span className="loading loading-spinner my-12" />
      ) : (
        userId ? (
          movieIds && movieIds.length > 0 ? (
            reformattedMovieData?.map((movie) => (
              <ListItem 
                key={movie.id}
                listType={listType}
                movieId={movie.id}
                posterPath={movie.posterPath}
                movieTitle={movie.movieTitle}
                releaseDate={movie.releaseDate}
                assessment={assessmentMap.get(movie.id)!}
              />
            ))
          ) : (
            <span className="my-8 text-lg">Add movies to your list at the home page!</span>
          )
        ) : (
        <span className="my-8 text-lg">Login to view movie lists.</span>
      )
      )}
    </section>
  );
}