import { useState, useEffect } from "react";
import MovieInfo from "@/app/components/browse/MovieInfo";
import { reformatDataModal } from "@/app/functions/functions";

interface MovieModalProp {
  movieId: number;
}

interface MovieInfoProps {
  movieId: number;
  backdropPath: string;
  genresNameList: string[];
  movieTitle: string;
  overview: string;
  runtime: number;
  voteAverage: number;
  releaseDate: string;
  videoKey: string;
  actorsNameList: string[];
}

export default function MovieModal({ movieId }: MovieModalProp) {
  const [movieData, setMovieData] = useState<MovieInfoProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/tmdb/browse?id=${movieId}`);
        const data = await res.json()

        if (!data) {
          setError("Movie not found.");
          setMovieData(null);
        } else {
          const reformattedData: MovieInfoProps = reformatDataModal(data)
          
          setMovieData(reformattedData);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setError("Something went wrong while fetching movie data.");
        setMovieData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (loading) return <div className="center-self">Loading...</div>;
  if (error) return <div className="flex justify-center items-center text-center">{error}</div>;

  return movieData ? <MovieInfo {...movieData} /> : null;
}
