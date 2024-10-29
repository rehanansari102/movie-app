const StarRating = ({ rating  } : any) => {
    const stars = Array.from({ length: 5 }, (_, index) => index < rating ? '★' : '☆');
    
    return (
      <div className="text-yellow-500">
        {stars.map((star, index) => (
          <span key={index} className="text-xl">{star}</span>
        ))}
      </div>
    );
  };
  export default StarRating;