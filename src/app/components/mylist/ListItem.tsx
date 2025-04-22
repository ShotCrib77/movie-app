"use client";
import ListItemImage from "./ListItemImage";
import RemoveMovie from "./RemoveMovie";

interface ListItemProps {
  listType: "wl" | "hw";
  assessment: number;
  posterPath?: string;
  movieTitle: string;
  releaseDate: string;
  movieId: number;
  onRemove:(movieId:number) => void;
}

export default function ListItem({listType, assessment, posterPath, movieTitle, releaseDate, movieId, onRemove}: ListItemProps) { 
  const releaseYear: string = releaseDate.split("-")[0]
  const roundedRating: number = Math.round((assessment) * 10) / 10;

  return (
    <section className="bg-slate-800 rounded-md p-4 text-center w-96">
      <div className="flex justify-end">
        <RemoveMovie movieId={movieId} onRemove={onRemove}/>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-2/5">
          <ListItemImage posterPath={posterPath} />
        </div>

        <div className="flex flex-col text-lg md:text-md gap-4 w-3/5">
          <div>
            <h3 className="w-11/12 mx-auto font-semibold">{movieTitle}</h3>
            <h3>{releaseYear}</h3>
          </div>

          <div>
            {listType === "hw" ? (
              <>
                <h3>Rating <br/> {roundedRating}/5 ⭐</h3>
              </>

            ) : (
              <>
                <h3></h3>
                <h3 className="">Priority <br/> {roundedRating}/5 📌</h3>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}