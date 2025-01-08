"use client";
import { useState } from "react";
import StarRating from "../general/StarRating";
import ListItemImage from "./ListItemImage";
import { List } from "postcss/lib/list";

interface ListItemProps {
  listType: "Watch Later" | "Have Watched";
  priority: "High" | "Medium" | "Low";
  rating: number;
  posterPath?: string;
  movieTitle: string;
  releaseDate: string;
  movieId: number;
}

export default function ListItem({listType, priority, rating, posterPath, movieTitle, releaseDate, movieId}: ListItemProps) { 
  const releaseYear: string = releaseDate.split("-")[0]

  return (
    <section className="bg-container flex w-9/12 justify-between border rounded-md p-3 text-center items-center">

      <ListItemImage posterPath={posterPath} />
      
      <div className="flex flex-col w-2/6">
        <h3 className="text-lg font-semibold">{movieTitle}</h3>
        <h3 className="text-lg">{releaseYear}</h3>
      </div>

      <div className="flex gap-8 w-2/6">
        <h3 className="text-lg w-1/2">2 jan 2024</h3>
        {listType === "Have Watched" ? (
          <h3 className="text-lg w-1/2">{rating}/5 ⭐</h3>
        ) : (
          <h3 className="text-lg w-1/2 text-red-800">{priority}</h3>
        )}
      </div>
    </section>
  );
}