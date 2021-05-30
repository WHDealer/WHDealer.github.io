import React from 'react';
import './StarRating.css';

interface Props {
  size: 'sm' | 'md' | 'lg';
  rating: number;
}

const mappingSize = { sm: 14, md: 20, lg: 30 };

const StarRating: React.FC<Props> = (props) => {
  const { size, rating } = props;

  const onStars = [];
  const offStars = [];
  const floorRating = Math.floor(rating);
  for (let i = 1; i <= floorRating; i++) onStars.push('fas fa-star checked');
  for (let i = floorRating + 2; i <= 5; i++) offStars.push('far fa-star checked');
  const width = (rating - floorRating) * 100 + '%';

  const newSize = mappingSize[size];

  return (
    <div className="d-flex align-items-center">
      {onStars.map((item: string, index: number) => (
        <div key={index} className={item} style={{ fontSize: newSize }} />
      ))}
      {rating < 5.0 && (
        <>
          <div className="far fa-star checked" style={{ fontSize: newSize, position: 'relative' }}>
            <div
              className="fas fa-star checked"
              style={{
                fontSize: newSize,
                position: 'absolute',
                width,
                top: 0,
                left: 0,
                overflow: 'hidden',
              }}
            />
          </div>
          {offStars.map((item: string, index: number) => (
            <div key={index} className={item} style={{ fontSize: newSize }} />
          ))}
        </>
      )}
    </div>
  );
};

export default StarRating;
