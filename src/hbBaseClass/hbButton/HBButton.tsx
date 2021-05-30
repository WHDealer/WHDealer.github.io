import React from 'react';
import './HBButton.css';

interface Props {
  className?: string;
  outline?: boolean;
  color?: 'petrol' | 'violet';
  style?: any;
  onClick?: any;
  disabled?: boolean;
  btnClassName?: string;
  type?: any;
}

const HBButton: React.FC<Props> = (props) => {
  const { className, color, style, outline, onClick, disabled, type, children, btnClassName } = props;
  let classNames = !color ? 'hb-btn' : `hb-btn-color hb-btn-${color}`;
  if (outline) classNames += ` outline`;
  if (btnClassName) classNames += ` ${btnClassName}`;

  return (
    <div className={className || ''}>
      <button type={type} className={classNames} onClick={onClick} disabled={disabled} style={style}>
        {children}
      </button>
    </div>
  );
};

export default HBButton;
