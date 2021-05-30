import React from 'react';
import './HBButtonSmall.css';

interface Props {
  className?: string;
  color?: 'petrol' | 'violet' | 'nightblue';
  style?: any;
  onClick?: any;
  disabled?: boolean;
  type?: any;
  light?: boolean;
}

const HBButtonSmall: React.FC<Props> = (props) => {
  const { className, color, style, onClick, disabled, type, children, light } = props;
  let classNames = !color ? 'hb-btn-small' : `hb-btn-small-color hb-btn-small-${color}`;
  if (className) classNames += ` ${className}`;

  return (
    <button
      type={type}
      className={`${classNames} ${light ? 'light' : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default HBButtonSmall;
