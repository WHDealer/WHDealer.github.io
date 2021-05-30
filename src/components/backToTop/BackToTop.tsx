import React, { useEffect, useState } from 'react';
import backToTop from './back-to-top.png';
import './BackToTop.scss';

const BackTopTop: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        if (!show) setShow(true);
      } else {
        setShow(false);
      }
    };
  }, []);

  return (
    <div className={`hb-back-to-top${show ? ' active' : ''}`} onClick={() => window.scrollTo(0, 0)}>
      <img src={backToTop} style={{ width: 50, height: 50 }} alt="back-to-top" />
    </div>
  );
};

export default BackTopTop;
