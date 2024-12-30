import React from 'react';

interface MovieCardProps {
  moviePosterSrc: string;
  movieTitle: string;
  releaseDate: string;
  rating: number;
}

export default function MovieCard({ moviePosterSrc, movieTitle, releaseDate, rating }: MovieCardProps) {
  // Make it a 0-5 range instead of 0-10 and rounding to the nearest decimal value
  const roundedRating: number = Math.round((rating/2) * 10) / 10;
  
  // Make the date only display year
  const releaseYear: string = releaseDate.split("-")[0]
  return (
    <section className="relative w-64 h-96 overflow-hidden cursor-pointer group flex-shrink-0">
      <img 
        className="w-full h-full rounded-md object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        src={`https://image.tmdb.org/t/p/w500/${moviePosterSrc}.jpg`}
        alt={movieTitle} 
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 rounded-md text-white opacity-0 transition-opacity duration 300 ease-in-out group-hover:opacity-100">
        <h2 className="text-xl font-bold whitespace-normal text-center">{movieTitle}</h2>
        <h2 className="text-lg">{releaseYear}</h2>
        <span>{roundedRating}/5 ⭐</span>
      </div>

    </section>
  );
}