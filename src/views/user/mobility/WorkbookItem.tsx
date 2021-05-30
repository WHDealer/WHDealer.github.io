import React from 'react';

interface Props {
  icon: 'file-text' | 'comment-2-question';
  label: string;
  callback: any;
}

const WorkbookItem: React.FC<Props> = (props) => {
  const { icon, label, callback } = props;

  return (
    <div className="hb-workbook-item" onClick={callback}>
      <div className="d-flex align-items-center" style={{ width: 'calc(100% - 30px)' }}>
        <div className="icon">
          <i className={`hb-icon-${icon}`} />
        </div>
        <div className="label">{label}</div>
      </div>
      <div className="arrow">
        <i className="hb-icon-arrow-right" />
      </div>
    </div>
  );
};

export default WorkbookItem;
