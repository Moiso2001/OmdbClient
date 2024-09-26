import { useState } from "react";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  maxRating?: number;
  handleRating: (ratingValue: number) => void;
}

/**
 * Util component, will display option up to 5 stars to allow user set a rate for a movie, 
 * this value will be used into submiting the movie rated to DB
 * 
 * @author mplata - 25/09/2024
 */
export function StarRating ({ maxRating = 5, handleRating }: StarRatingProps){
  /* Global States */
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  /* Function handlers */
  const handleStarClick = (ratingValue: number) => {
    setRating(ratingValue);  
    handleRating(ratingValue);
  };

  return (
    <div className="d-flex">
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onChange={() => handleStarClick(ratingValue)}
              style={{ display: "none" }}
            />
            <FaStar
              className="star"
              size={30}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              style={{ cursor: "pointer" }}
            />
          </label>
        );
      })}
    </div>
  );
};
