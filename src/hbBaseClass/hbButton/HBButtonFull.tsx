import React from 'react';
import './HBButton.css';

interface Props {
  className?: string;
  outline?: boolean;
  color?: 'petrol' | 'violet';
  onClick?: any;
  disabled?: boolean;
  type?: any;
}

const HBButtonFull: React.FC<Props> = (props) => {
  const { className, color, outline, onClick, disabled, type, children } = props;
  let classNames = !color ? 'hb-btn' : `hb-btn-color hb-btn-${color}`;
  if (outline) classNames += ` outline`;
  if (className) classNames += ` ${className}`;

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      style={{ width: '100%', height: '100%', margin: 0, padding: 0, boxSizing: 'border-box' }}
    >
      {children}
    </button>
  );
};

export default HBButtonFull;
