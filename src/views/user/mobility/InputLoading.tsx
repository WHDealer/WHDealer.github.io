import React from 'react';
import { loadingSmall } from '../../../extensions';

const InputLoading: React.FC = (props) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: 56, width: '100%', marginTop: 16 }}
    >
      {loadingSmall}
    </div>
  );
};

export default InputLoading;
