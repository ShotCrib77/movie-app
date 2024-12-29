"use client";
import { useState } from "react";

export default function ListOptions() {
  const [activeList, setActiveList] = useState<"Have Watched" | "Watch Later">("Have Watched")

  const changeActiveList = () => {
    setActiveList(activeList === "Have Watched" ? "Watch Later" : "Have Watched")
  }

  return (
    <section className="flex w-4/6 ml-4 items-center gap-3">
      <button
        className={`bg-button rounded text-white p-3 ${activeList === "Have Watched" ? "scale-110" : ""}`}
        onClick={changeActiveList}>
        Have Watched
      </button>

      <button
        className={`bg-button rounded text-white p-3 ${activeList === "Watch Later" ? "scale-110" : ""}`}
        onClick={changeActiveList}>
        Watch Later
      </button>
    </section>
  );
}