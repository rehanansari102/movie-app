import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StarRatingProps {
  rating: number;
  movieTitle : string;
  onRatingChange: (rating: number) => void;
  userRated?: boolean;  // Optional prop to prevent changes after user has rated
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange,movieTitle, userRated = false }) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);  // For hover effect

  const handleRatingChange = (newRating: number) => {
  
      onRatingChange(newRating);
      toast.success(`You rated '${movieTitle}' ${newRating} stars!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
  };

  return (
    <div className={rating > 0 ?  "disable":""}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRatingChange(star)}  
          onMouseEnter={() => setHoveredRating(star)}  // Set hover state
          onMouseLeave={() => setHoveredRating(0)}  // Reset hover state
          style={{
            cursor: "pointer",
            color: star <= (hoveredRating || rating) ? "gold" : "gray",  // Highlight stars based on hover or rating
            fontSize: "1.5em",
          }}
        >
          ★
        </span>
      ))}
    
    </div>
  );
};

export default StarRating;