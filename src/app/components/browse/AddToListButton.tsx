interface AddToListButtonProp {
  type: "Watch Later" | "Rate"
}

export default function AddToListButton({type}: AddToListButtonProp) {
  return (
    <button
      className="bg-gray-950 rounded-3xl px-4 py-1 w-fit text-sm h-fit flex items-center"

    >
      {type === "Watch Later" ? "Add to Watchlist": "Rate Movie"} <span className="text-lg">&nbsp;{type === "Watch Later" ? "+": "⭐"}</span>
    </button>
  );
}