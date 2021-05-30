import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const mapTypes = { success: 0, error: 1, warning: 2, info: 3 };
const colors = ['#006644', '#BF2600', '#DF6B00', '#505F79'];
const backgroundColors = ['#E3FCEF', '#FFEBE6', '#FFFBE9', '#FFFFFF'];
const iconBackgroundColors = ['#36B37E', '#FF5630', '#FFAB00', '#2684FF'];

const icons = [
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
  </svg>,
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
  </svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
  </svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
  </svg>,
];

const Toast = (props) => {
  const { message, duration, onRemove } = props;

  const [state, setState] = useState(true);
  const timeout = useRef();

  useEffect(() => {
    setState(true);
    if (duration) {
      timeout.current = setTimeout(() => {
        close();
      }, duration);
    }
    return () => clearTimeout(timeout.current);
  }, []);

  const close = () => {
    setState('close');
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setState(false);
      onRemove && onRemove();
    }, 2000);
  };

  const className = state === true ? 'hb-toast-fade-in' : 'hb-toast-fade-out';
  let type = mapTypes[props.type];
  if (!type) type = 0;

  return (
    <div>
      {state && (
        <div
          className={`hb-toast ${className}`}
          style={{ color: colors[type], backgroundColor: backgroundColors[type] }}>
          <div
            className="hb-close"
            onClick={() => {
              state === true && close();
            }}></div>
          <div
            style={{ backgroundColor: iconBackgroundColors[type], paddingTop: 14, minWidth: 32 }}>
            {icons[type]}
          </div>
          <div style={{ padding: '14px 36px 14px 14px', textAlign: 'left' }}>{message}</div>
        </div>
      )}
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  duration: PropTypes.number,
  onRemove: PropTypes.func,
};

Toast.defaultProps = {
  type: 'success',
  message: 'This is a Toast.',
  duration: 3000,
};

export default Toast;
