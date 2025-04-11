"use client";

import { useState, useEffect, useRef } from "react";
import AddToListButton from "./AddToListButton";
import Modal from "../general/modal/Modal";
import StarRating from "../general/StarRating";

export default function AddToListSection({ movieId , type}: { movieId: number, type: "hw" | "wl" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(2.5);
  const [userId, setUserId] = useState<string | null>(null);
  const userIdRef = useRef<string | null>(null);
  const [error, setError] = useState(false);

  const getUserId = async () => {
    try {
    const res = await fetch("/api/isloggedin");
    const data = await res.json();
    if (res.ok && data.isLoggedIn) {
      userIdRef.current= data.userId;
      setUserId(data.userId);
    }
    } catch (err) {
      console.error("Error checking login: ", err)
    }
  }

  const handleSubmitRating = async () => {
    await getUserId();
    let errorRef = null;
    if (ratingValue !== null) {
      try { 
        const res = await fetch(`/api/movies`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userIdRef.current,
            movieId: movieId,
            listType: type,
            assessment: ratingValue
          }),
        });

        if (!res.ok) {
          setError(true)
          errorRef = true
        }
      } catch (err) {
        console.error("Error adding movie to list", err)
      } finally {
        if (!errorRef) {
          setIsModalOpen(false)
        }
      }
    }
  };

  return (
    <>
      <AddToListButton type={type} onClick={() => setIsModalOpen(true)} />
      
      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <div className="mx-auto flex flex-col items-center justify-center gap-4 pb-4 px-4 bg-slate-800 rounded-lg shadow-lg max-w-64 my-48">
          <h2 className="text-xl font-bold text-center mt-4">{type === "hw" ? ("Add Rating") : ("Set Priority For Movie") }</h2>
          <StarRating
            isReadOnly={false}
            starSize="large"
            precision={0.5}
            starRating={ratingValue || 0}
            onRatingChange={(val) => setRatingValue(val)}
            listType={type}
          />
          <button
            onClick={handleSubmitRating}
            className="bg-gray-900 text-white px-4 py-2 rounded-full mt-4 text-center"
          >
            {type === "hw" ? ("Submit Rating") : "Add To Watch Later List"}
          </button>
          {error ? (<span className="text-center text-red-700">You need to login to add movies to lists!</span>) : (null)}
        </div>
      </Modal>
    </>
  );
}
