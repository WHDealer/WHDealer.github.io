import React from 'react';
import './HBButtonArrow.scss';

interface Props {
  direction: 'left' | 'right';
  handleClick: any;
  disabled?: boolean;
}

const HBButtonArrow: React.FC<Props> = (props) => {
  const { direction, handleClick, disabled } = props;

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="hb-btn-arrow"
      children={<i className={`hb-icon-arrow-${direction}`} />}
    />
  );
};

export default HBButtonArrow;
