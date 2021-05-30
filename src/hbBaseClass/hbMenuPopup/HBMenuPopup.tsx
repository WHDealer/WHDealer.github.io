import React, { useEffect, useRef } from 'react';
import './HBMenuPopup.scss';

interface Props {
  className?: string;
  show: boolean;
  top: number;
  left: number;
  width: number;
  title?: string;
  items: {
    id: string;
    label: string;
    icon: string;
    handle: () => void;
  }[];
  handleClose: () => void;
}

const HBMenuPopup: React.FC<Props> = (props) => {
  const { className = '', show, top, left, width, title, items, handleClose } = props;

  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <div ref={ref} className={`hb-menu-popup-wrapper ${show ? 'active' : 'hide'} ${className}`} style={{ top, left, width }}>
      <div className="hb-menu-popup">
        {items.map((item: any, index: number) => (
          <div
            key={item.id}
            onClick={() => {
              item.handle();
              handleClose();
            }}
            className="hb-menu-popup-item"
          >
            <div className={`item ${index !== 0 ? 'line' : ''}`}>
              <i className={`hb-menu-popup-icon hb-icon-${item.icon}`} /> {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="arrow"></div>
    </div>
  );
};

export default HBMenuPopup;
