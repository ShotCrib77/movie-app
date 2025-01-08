import { Rating } from "@mui/material";

interface StarRatingProps {
  isReadOnly: boolean;
  starSize?: "medium" | "large";
  starRating: number;
  precision: 1 | 0.1;
}

export default function StarRating({isReadOnly, starSize, precision, starRating}: StarRatingProps) {
  return (
    <Rating name="half-rating-read" size={starSize} defaultValue={starRating} precision={precision} readOnly={isReadOnly} />
  );
}