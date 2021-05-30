import React from 'react';

const ContainterEllipse: React.FC = (props) => {
  const { children } = props;

  return (
    <>
      <div className="hb-ellipse">
        <div className="hb-ellipse-children" />
      </div>
      <div className="hb-wrapper">{children}</div>
    </>
  );
};

export default ContainterEllipse;
