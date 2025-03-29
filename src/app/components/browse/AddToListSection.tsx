"use client";

import { useState } from "react";
import AddToListButton from "./AddToListButton";
import Modal from "../general/modal/Modal";
import StarRating from "../general/StarRating";

export default function AddToListSection({ movieId , type}: { movieId: number, type: "hw" | "wl" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(2.5);

  const handleSubmitRating = async () => {
    if (ratingValue !== null) {
      await fetch(`/api/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          movieId: movieId,
          listType: type,
          assessment: ratingValue
        }),
      });
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <AddToListButton type={type} onClick={() => setIsModalOpen(true)} />
      
      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Rate this movie</h2>
          <StarRating
            isReadOnly={false}
            starSize="large"
            precision={0.5}
            starRating={ratingValue || 0}
            onRatingChange={(val) => setRatingValue(val)}
          />
          <button
            onClick={handleSubmitRating}
            className="bg-gray-900 text-white px-4 py-2 rounded-full mt-4"
          >
            Submit Rating
          </button>
        </div>
      </Modal>
    </>
  );
}
