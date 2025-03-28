"use client";

import { useState, useEffect, use } from "react";

export default function MagicButtonb() {

  const magicFunc = async () => {
    try {
      const res = await fetch(`/api/tmdb/mylist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieIdList: [124, 245, 103, 12]
      }),
    });
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
