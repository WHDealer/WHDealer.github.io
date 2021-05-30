import React from 'react';

interface Props {
  className?: string;
  centered?: boolean;
  label: string;
  width?: number;
  style?: any;
}

const FieldName: React.FC<Props> = (props) => {
  let { className, label, children, width, centered, style } = props;
  width = width || 110;

  return (
    <div className={`d-flex mb-3 ${centered ? 'align-items-center' : ''} ${className || ''}`} style={style}>
      <div style={{ minWidth: width, marginTop: 6 }}>{label}</div>
      <div style={{ width: `calc(100% - ${width}px)` }}>{children}</div>
    </div>
  );
};

export default FieldName;
