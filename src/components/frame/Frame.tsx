import React from 'react';

interface Props {
  size: 'lg' | 'md' | 'sm';
  render: any;
}

const mappingSize = { lg: 80, md: 48, sm: 36 };

const Frame: React.FC<Props> = (props) => {
  const { size, render } = props;

  return (
    <div style={{ marginTop: 14, marginBottom: 20, display: 'flex', width: '100%' }}>
      <div style={{ width: '100%', height: mappingSize[size] }}>{render}</div>
    </div>
  );
};

export default Frame;
