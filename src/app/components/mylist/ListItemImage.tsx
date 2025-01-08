import React from 'react'
import ImagePlaceholder from "../general/ImagePlaceholder";

interface ListItemImageProps {
  posterPath?: string;
}

export default function ListItemImage({posterPath}: ListItemImageProps) {
  return (
    <div className="flex justify-center w-2/6">
      {posterPath ? <img className="w-32 h-48 object-contain" src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="Movie Poster"/> : (<ImagePlaceholder size={"md"} />)}
    </div>
  );
}
