interface AddToListButtonProp {
  type: "wl" | "hw";
  onClick: () => void;
}

export default function AddToListButton({ type, onClick }: AddToListButtonProp) {
  return (
    <button
      className="bg-slate-950 hover:bg-gray-900 mt-3 rounded-3xl px-4 py-1 w-fit text-sm h-fit flex items-center text-white"
      onClick={onClick}
    >
      {type === "wl" ? "Add to Watchlist" : "Rate Movie"}
      <span className="text-lg">&nbsp;{type === "wl" ? "+" : "⭐"}</span>
    </button>
  );
}
