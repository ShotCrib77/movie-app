import { Rating } from "@mui/material";

interface StarRatingProps {
  isReadOnly: boolean;
  starSize?: "medium" | "large";
  precision: 1 | 0.1;
}

export default function StarRating({isReadOnly, starSize, precision}: StarRatingProps) {
  return (
    <>
      {starSize ? (
        <Rating name="half-rating-read" size={starSize} defaultValue={1} precision={precision} readOnly={isReadOnly} />
      ) : (
        <h1>N/A</h1>
      )}
    </>
  );
}