"use client";
import { useState } from "react";
import StarRating from "../general/StarRating";
import ListItemImage from "./ListItemImage";
import { List } from "postcss/lib/list";

interface ListItemProps {
  listType: "wl" | "hw";
  assessment: number;
  posterPath?: string;
  movieTitle: string;
  releaseDate: string;
  movieId: number;
}

export default function ListItem({listType, assessment, posterPath, movieTitle, releaseDate, movieId}: ListItemProps) { 
  const releaseYear: string = releaseDate.split("-")[0]
  const roundedRating: number = Math.round((assessment) * 10) / 10;

  return (
    <section className="bg-slate-800 flex w-9/12 justify-between rounded-md p-3 text-center items-center">

      <ListItemImage posterPath={posterPath} />
      
      <div className="flex flex-col w-2/6">
        <h3 className="text-lg font-semibold">{movieTitle}</h3>
        <h3 className="text-lg">{releaseYear}</h3>
      </div>

      <div className="flex gap-8 w-2/6">
        <h3 className="text-lg w-1/2">2 jan 2024</h3>
        {listType === "hw" ? (
          <h3 className="text-lg w-1/2">{roundedRating}/5 ⭐</h3>
        ) : (
          <h3 className="text-lg w-1/2">{roundedRating}/5 📌</h3>
        )}
      </div>
    </section>
  );
}