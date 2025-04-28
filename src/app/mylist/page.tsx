"use client";

import { useEffect, useState } from "react";
import ListItemsContainer from "../components/mylist/ListItemsContainer";
import ListOptions from "../components/mylist/ListOption";

export default function Mylist() {

  // Custom hook för att hantera aktiv lista med localStorage. 
  function useActiveList() {
    const [listType, setListType] = useState<"wl" | "hw">("wl");
  
    useEffect(() => {
      const savedList = localStorage.getItem("activeList");
      if (savedList === "Have Watched") {
        setListType("hw");
      }
    }, []);
  
    const changeActiveList = (newList: "Watch Later" | "Have Watched") => {
      setListType(newList === "Have Watched" ? "hw" : "wl");
      localStorage.setItem("activeList", newList);
    };
  
    return { listType, changeActiveList };
  }

  const { listType, changeActiveList } = useActiveList();


  

  return (
    <main className="flex flex-col justify-center items-center py-24">
      <h1>{listType === "wl" ? ("Watch Later") : ("Have Watched")}</h1>
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