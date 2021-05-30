import React from 'react';
import './HBButtonIcon.css';

interface Props {
  style?: any;
  icon?: string;
  size?: number;
  color?: string;
  disabled?: boolean;
  onClick?: any;
  circle?: { size: number; color: string };
  iconStyle?: any;
}

const HBButtonIcon: React.FC<Props> = (props) => {
  const { style, icon, size, color, disabled, onClick, circle, iconStyle } = props;

  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  if (circle)
    return (
      <div
        className={`hb-btn-icon ${disabled ? 'disabled' : ''}`}
        onClick={handleClick}
        style={{
          width: circle.size,
          height: circle.size,
          borderRadius: 30,
          backgroundColor: circle.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        <i
          className={`hb-icon-${icon}`}
          style={{ fontSize: size, color, cursor: disabled ? 'default' : 'pointer', ...iconStyle }}
          onClick={handleClick}
        />
      </div>
    );

  return (
    <i
      className={`hb-btn-icon hb-icon-${icon} ${disabled ? 'disabled' : ''}`}
      style={{ fontSize: size, color, cursor: disabled ? 'default' : 'pointer', ...style }}
      onClick={handleClick}
    />
  );
};

export default HBButtonIcon;
