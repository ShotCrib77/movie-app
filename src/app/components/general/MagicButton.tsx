"use client";

import { useState, useEffect, use } from "react";

export default function MagicButton() {

  const magicFunc = async () => {
    try {
      const res = await fetch(`/api/movies?userId=1&status=hw`, {method: "GET"});
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(`Error fetching movies`, err);
      return [];
    }
  };

  return (
    <div>
      <button 
        className="bg-slate-800 rounded-md py-4 px-8 hover:bg-slate-600"
        onClick={magicFunc}
      >
        CLICK ME
      </button>
    </div>
  );
}
