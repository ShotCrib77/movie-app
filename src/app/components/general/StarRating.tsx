import { Rating } from "@mui/material";
import { useState } from "react";

interface StarRatingProps {
  isReadOnly: boolean;
  starSize?: "medium" | "large";
  starRating: number;
  precision: 1 | 0.5;
  onRatingChange?: (value: number | null) => void;
}

export default function StarRating({isReadOnly, starSize, precision, starRating, onRatingChange}: StarRatingProps) {
  const [value, setValue] = useState<number | null>(starRating);

  const handleChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
    if (onRatingChange) onRatingChange(newValue);
  };

  return (
    <Rating
      name="controlled-rating"
      size={starSize}
      value={value}
      precision={precision}
      readOnly={isReadOnly}
      onChange={handleChange}
    />
  );
}
