import React from 'react';

interface Props {
  size: 'large' | 'medium' | 'small';
  render: any;
}

const mappingSize = { large: 80, medium: 48, small: 36 };

const Frame: React.FC<Props> = (props) => {
  const { size, render } = props;

  return (
    <div className="video-comments--comment">
      <div style={{ width: '100%', height: mappingSize[size] }}>{render}</div>
    </div>
  );
};

export default Frame;
