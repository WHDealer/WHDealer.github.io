import React, { useEffect, useRef } from 'react';
import './MenuPopup.css';

interface Props {
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

const MenuPopup: React.FC<Props> = (props) => {
  const { show, top, left, width, title, items, handleClose } = props;

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
    <div ref={ref} className={`menu-popup ${show ? 'active' : 'hide'}`} style={{ top, left, width }}>
      {title && (
        <div
          style={{
            width: '100%',
            borderBottom: '1px solid #eee',
            textAlign: 'center',
            marginBottom: 10,
            paddingBottom: 10,
          }}
        >
          {title}
        </div>
      )}
      {items.map((item: any) => (
        <div
          key={item.id}
          onClick={() => {
            item.handle();
            handleClose();
          }}
          className="menu-popup-item"
        >
          {item.label} <i className={`menu-popup-icon ${item.icon}`} />
        </div>
      ))}
    </div>
  );
};

export default MenuPopup;
