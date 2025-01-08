"use client";

interface ListItemHeaderProp {
  listType: "Watch Later" | "Have Watched"
}

export default function ListItemHeader({listType}: ListItemHeaderProp) {
  return(
    <section className="flex w-9/12 justify-between items-center border rounded-md p-3 text-center">
      <h2 className="text-xl w-2/6">Poster</h2>
      <h2 className="text-xl w-2/6">Title</h2>
      <div className="flex gap-8 w-2/6">
        <h2 className="text-xl w-1/2">Date Added 📅</h2>
        {listType === "Have Watched" ?(
          <h2 className="text-xl w-1/2">Rating ⭐</h2>
        ) : (
          <h2 className="text-xl w-1/2">Priority 📌</h2>
        )}
      </div>
    </section>
  );
}