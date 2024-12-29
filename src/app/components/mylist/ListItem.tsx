"use client";
import ImagePlaceholder from "../general/ImagePlaceholder";
import StarRating from "../general/StarRating";
import { useState } from "react";

interface ListItemProps {
  imageSrc?: string;
  movieName: string;
  movieYear: number;
}

export default function ListItem({imageSrc, movieName, movieYear}: ListItemProps) {

  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [starSize, setStarSize] = useState<"medium"|"large">("medium");

  const changeIsReadOnly = () => {
    setIsReadOnly(prev => !prev);
    setStarSize(starSize === "medium" ? "large" : "medium");
  };

  return (
    <section className={`bg-container w-4/6 grid grid-cols-3 justify-center items-center rounded-2xl py-8   ${!isReadOnly ? "scale-105": ""}`}>
      <div className="flex justify-center">
        {imageSrc ? <img src={imageSrc} alt={movieName}/> : (<ImagePlaceholder size={"md"} />)}
      </div>

      <div className="flex flex-col items-center">
        <div>
          <h2 className="font-semibold">{movieName}</h2>
          <h2>{movieYear}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <StarRating isReadOnly={isReadOnly} precision={1} starSize={starSize} />
        <button 
          className="bg-button rounded-lg p-1 w-32"
          onClick={changeIsReadOnly}>
          {isReadOnly ? ("Change Rating") : ("Confirm")}
        </button>
      </div>
    </section>
  );
}