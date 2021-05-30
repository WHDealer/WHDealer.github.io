import { CSpinner } from '@coreui/react';
import React from 'react';

interface Props {
  size: 'lg' | 'md' | 'sm';
}

const mappingSize = {
  lg: { height: 80, spinnerSize: '2.2rem', borderSize: '0.34rem' },
  md: { height: 60, spinnerSize: '1.6rem', borderSize: '0.28rem' },
  sm: { height: 40, spinnerSize: '1.2rem', borderSize: '0.24rem' },
};

const FrameLoading: React.FC<Props> = (props) => {
  const { size } = props;

  const newSize = mappingSize[size];

  return (
    <div
      style={{
        margin: '1.2rem 0',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: newSize.height,
      }}
    >
      <CSpinner
        style={{
          width: newSize.spinnerSize,
          height: newSize.spinnerSize,
          border: `${newSize.borderSize} solid #979899`,
          borderRightColor: 'transparent',
        }}
      />
    </div>
  );
};

export default FrameLoading;
