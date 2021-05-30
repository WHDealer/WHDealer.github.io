import React, { useState } from 'react';
import './StarRating.css';

interface Props {
  rating: number;
}

const StarRating: React.FC<Props> = (props) => {
  const [rating, setRating] = useState(props.rating);

  const stars = [];
  for (let i = 1; i <= rating; i++) stars.push('fa fa-star checked cursor-pointer');
  for (let i = rating + 1; i <= 5; i++) stars.push('fa fa-star cursor-pointer');

  return (
    <div>
      {stars.map((item: string, index: number) => (
        <span className={item} onClick={() => setRating(index + 1)} />
      ))}
    </div>
  );
};

export default StarRating;
