"use client";

import ListItemsContainer from "../components/mylist/ListItemsContainer";
import ListOptions from "../components/mylist/ListOption";
import { useState } from "react";

export default function Mylist() {
  const [activeList, setActiveList] = useState<"Have Watched" | "Watch Later">("Have Watched");

  return (
    <section className="flex flex-col justify-center items-center py-24">
      <ListOptions activeList={activeList} setActiveList={setActiveList} />
      {activeList === "Have Watched" ? (
        <ListItemsContainer haveWatched={true} />
      ) : (
        <ListItemsContainer haveWatched={false} />
      )}
    </section>
  );
}