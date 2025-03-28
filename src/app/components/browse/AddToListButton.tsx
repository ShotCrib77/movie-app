import { MdOutlineAssessment } from "react-icons/md";

interface AddToListButtonProp {
  type: "wl" | "hw"
  movieId: number;
}

export default function AddToListButton({type, movieId}: AddToListButtonProp) {
  const AddToListFunc = async () => {
    await fetch(`/api/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        movieId: movieId,
        listType: type,
        assessment: 2.4
      }),
    });
  }

  return (
    <button
      className="bg-gray-950 rounded-3xl px-4 py-1 w-fit text-sm h-fit flex items-center"
      onClick={AddToListFunc}
    >
      {type === "wl" ? "Add to Watchlist": "Rate Movie"} <span className="text-lg">&nbsp;{type === "wl" ? "+": "⭐"}</span>
    </button>
  );
}