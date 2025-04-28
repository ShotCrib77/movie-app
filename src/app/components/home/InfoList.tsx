"use client";

import { useState } from "react";

interface CastListProp {
  itemList: string[];
  itemType: string;
}

export default function InfoList({itemList, itemType}: CastListProp) {
  const [showAll, setShowAll] = useState<boolean>(false);

  const displayedItems = showAll ? itemList : itemList.slice(0, 4);

  const toggleShow = () => {
    setShowAll(prev => !prev)
  }

  return (
    <div>
      <span className="text-sm">
        <span className="text-gray-400">{itemType}:</span> {displayedItems.join(", ")}
      </span> {" "}
      {itemList.length > 4 ? (
      <button
        className="italic text-sm"
        onClick={toggleShow}
      >
        {!showAll ? ("more") : ("less") }
      </button>
      ): (
        null
      )}
    </div>
  );
}