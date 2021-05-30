import React from 'react';
import { Link } from 'react-router-dom';
import { logoMain } from '../../../extensions';

const HeaderLogo: React.FC = (props) => {
  return (
    <div style={{ height: 80 }}>
      <div className="hb-header no-border">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
          <Link to="/">{logoMain}</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogo;
