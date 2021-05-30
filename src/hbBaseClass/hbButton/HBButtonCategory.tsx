import React from 'react';
import './HBButtonCategory.scss';

interface Props {
  active: boolean;
  name: string;
  count: number;
  onClick: any;
  hideNumber?: boolean;
}

const HBButtonCategory: React.FC<Props> = (props) => {
  const { active, name, count, onClick, hideNumber } = props;
  return (
    <div>
      <div
        className={`hb-btn-my-category ${active ? 'active' : ''}`}
        style={hideNumber ? { padding: '0 12px' } : {}}
        onClick={onClick}
      >
        {name}
        {active && !hideNumber && <div className="hb-btn-my-category-circle">{count || 0}</div>}
      </div>
      {active && <div className="hb-btn-my-category-dot" />}
    </div>
  );
};

export default HBButtonCategory;
