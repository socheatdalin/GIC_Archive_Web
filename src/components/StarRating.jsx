import React, { useState } from 'react';
import '../styles/star.css';

function StarRating() {
  const [rating, setRating] = useState(null);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  return (
    <div className="center">
      <div className="stars">
        <input
          type="radio"
          id="five"
          name="rate"
          value="5"
          checked={rating === '5'}
          onChange={handleRatingChange}
        />
        <label htmlFor="five"></label>
        <input
          type="radio"
          id="four"
          name="rate"
          value="4"
          checked={rating === '4'}
          onChange={handleRatingChange}
        />
        <label htmlFor="four"></label>
        <input
          type="radio"
          id="three"
          name="rate"
          value="3"
          checked={rating === '3'}
          onChange={handleRatingChange}
        />
        <label htmlFor="three"></label>
        <input
          type="radio"
          id="two"
          name="rate"
          value="2"
          checked={rating === '2'}
          onChange={handleRatingChange}
        />
        <label htmlFor="two"></label>
        <input
          type="radio"
          id="one"
          name="rate"
          value="1"
          checked={rating === '1'}
          onChange={handleRatingChange}
        />
        <label htmlFor="one"></label>
        <span className="result">{rating}</span>
      </div>
    </div>
  );
}

export default StarRating;
