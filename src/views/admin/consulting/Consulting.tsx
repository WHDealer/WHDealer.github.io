import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const Consulting: React.FC<RouteComponentProps> = (props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontSize: 30 }}>
      Consulting Management
    </div>
  );
};

export default Consulting;
