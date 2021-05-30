import React from 'react';

interface Props {
  your_topics: any;
  saveSetting: any;
}

const YourTopicsIsSelected: React.FC<Props> = (props) => {
  const { your_topics, saveSetting } = props;

  return (
    <div className="hb-my-categories-wrapper">
      <div className="label">Ihre Auswahl</div>
      <div className="items-wrapper hb-scroll">
        {your_topics.map((item: { id: string; name: string }, index: number) => (
          <div key={index} className="item" onClick={() => saveSetting(item)}>
            <div className="d-flex align-items-center">
              <div style={{ marginRight: 10 }}>{item.name}</div>
              <i className="hb-icon-close" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourTopicsIsSelected;
