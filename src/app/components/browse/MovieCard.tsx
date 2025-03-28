"use client";

import React from 'react';
import { useState } from 'react';

interface MovieCardProps {
  id: number;
  moviePosterSrc: string;
  movieTitle: string;
  releaseDate: string;
  rating: number;
  onClick: (id: number) => void;
}

export default function MovieCard({id, moviePosterSrc, movieTitle, releaseDate, rating, onClick }: MovieCardProps) {
  // Make it a 0-5 range instead of 0-10 and rounding to the nearest decimal value
  const roundedRating: number = Math.round((rating/2) * 10) / 10;
  
  // Make the date only display year
  const releaseYear: string = releaseDate.split("-")[0]

  const [isValidSrc, setIsValidSrc] = useState<boolean>(true);

  return (
    <section
      className="relative w-32 h-48 lg:w-64 lg:h-96 overflow-x-scroll cursor-pointer group flex-shrink-0 rounded-md"
      onClick={() => onClick(id)}
    >
      <img 
        className="w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        src={`https://image.tmdb.org/t/p/w500/${moviePosterSrc}`}
        alt={`Movie poster for ${movieTitle}`}
      />

      <div className="absolute rounded-md inset-0 flex flex-col items-center justify-center bg-gray-950 text-white opacity-0 transition-opacity duration 300 ease-in-out group-hover:opacity-100">
        <h2 className="text-xl font-bold whitespace-normal text-center">{movieTitle}</h2>
        <h2 className="text-lg">{releaseYear}</h2>
        <span>{roundedRating}/5 ⭐</span>
      </div>

    </section>
  );
}