import React from 'react';
import './StarRating.css';

interface Props {
  size: 'sm' | 'md' | 'lg';
  rating: number;
}

const mappingSize = { sm: 14, md: 20, lg: 30 };

const StarRating: React.FC<Props> = (props) => {
  const { size, rating } = props;

  const stars = [];
  for (let i = 1; i <= rating; i++) stars.push('fa fa-star checked cursor-pointer');
  for (let i = rating + 1; i <= 5; i++) stars.push('fa fa-star cursor-pointer');

  return (
    <div>
      {stars.map((item: string, index: number) => (
        <span key={index} className={item} style={{ fontSize: mappingSize[size] }} />
      ))}
    </div>
  );
};

export default StarRating;
