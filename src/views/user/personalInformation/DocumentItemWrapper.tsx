import React from 'react';

interface Props {
  title: string;
}

const DocumentItemWrapper: React.FC<Props> = (props) => {
  const { title, children } = props;

  return (
    <div className="hb-document-item">
      <div className="title">{title}</div>
      <div className="content">{children}</div>
    </div>
  );
};
export default DocumentItemWrapper;
