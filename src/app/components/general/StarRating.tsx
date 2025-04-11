import { Rating } from "@mui/material";
import { useState } from "react";

interface StarRatingProps {
  isReadOnly: boolean;
  listType: "hw" | "wl";
  starSize?: "medium" | "large";
  starRating: number;
  precision: 1 | 0.5;
  onRatingChange?: (value: number | null) => void;
}

export default function StarRating({listType, isReadOnly, starSize, precision, starRating, onRatingChange}: StarRatingProps) {
  const [value, setValue] = useState<number | null>(starRating);

  const handleChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
    if (onRatingChange) onRatingChange(newValue);
  };

  return (
    <Rating
      name="controlled-rating"
      size={starSize}
      {...(listType !== "hw" && {
        icon: <span style={{ fontSize: '2rem' }}>📌</span>,
        emptyIcon: <span style={{ fontSize: '2rem', opacity: 0.3 }}>📌</span>
      })}
      value={value}
      precision={precision}
      readOnly={isReadOnly}
      onChange={handleChange}
    />
  );
}
