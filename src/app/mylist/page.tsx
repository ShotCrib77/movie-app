"use client";

import { useState } from "react";
import ListItemsContainer from "../components/mylist/ListItemsContainer";
import ListOptions from "../components/mylist/ListOption";

export default function Mylist() {
  const [listType, setListType] = useState<"wl" | "hw">(() => {
    // Initiera från localstorage eller standardvärde till watch later
    const savedList = localStorage.getItem("activeList");
    return savedList === "Have Watched" ? "hw" : "wl";
  });

  const changeActiveList = (newList: "Watch Later" | "Have Watched") => {
    setListType(newList === "Have Watched" ? "hw" : "wl");
    localStorage.setItem("activeList", newList); // Spara till localstorage
  };

  return (
    <main className="flex flex-col justify-center items-center py-24">
      <h1></h1>
      <ListOptions
        activeList={listType === "hw" ? "Have Watched" : "Watch Later"}
        changeActiveList={changeActiveList}
      />
      <div className="flex flex-col gap-2 w-full items-center">
        {listType === "hw" ? (
          <ListItemsContainer listType={"hw"} />
        ) : (
          <ListItemsContainer listType={"wl"} />
        )}
      </div>
    </main>
  );
}