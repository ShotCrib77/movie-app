import React from 'react'
import ImagePlaceholder from "../general/ImagePlaceholder";

interface ListItemImageProps {
  posterPath?: string;
}

export default function ListItemImage({posterPath}: ListItemImageProps) {
  return (
    <div className="flex justify-center">
      {posterPath ? <img className="w-full object-contain" src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="Movie Poster"/> : (<ImagePlaceholder size={"md"} />)}
    </div>
  );
}
