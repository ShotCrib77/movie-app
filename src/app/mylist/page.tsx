"use client";
import { useState } from "react";
import ListItemsContainer from "../components/mylist/ListItemsContainer";
import ListOptions from "../components/mylist/ListOption";
import ListItemHeader from "../components/mylist/ListItemHeader";
import ListItem from "../components/mylist/ListItem";

export default function Mylist() {

  const [activeList, setActiveList] = useState<"Have Watched" | "Watch Later">("Have Watched")

  const changeActiveList = () => {
    setActiveList(activeList === "Have Watched" ? "Watch Later" : "Have Watched");
  };

  return (
    <section className="flex flex-col justify-center items-center py-24">
      <ListOptions activeList={activeList} changeActiveList={changeActiveList}/>
      <div className="flex flex-col gap-2 w-full items-center">
        <ListItemHeader listType="Have Watched"/>
        {activeList === "Have Watched" ? (
          <ListItemsContainer listType={"Have Watched"}/>
        ) : (
          <ListItemsContainer listType={"Watch Later"}/>
        )}
      </div>
    </section>
  );
}