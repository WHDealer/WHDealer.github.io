import React from 'react';
import classNames from 'classnames';
import { includes } from '../../../utils';

interface Props {
  label: string;
  your_topics: [];
  data: any;
  saveSetting: any;
}

const ContentNewsfeed: React.FC<Props> = (props) => {
  const { label, your_topics, saveSetting, data } = props;

  return (
    <div className="hb-categories-wrapper">
      <div className="label">{label}</div>
      <div className="items-wrapper">
        {data.map((item: any, index: number) => (
          <div
            key={index}
            className={classNames('item', {
              active: includes(your_topics, item),
            })}
            onClick={() => saveSetting(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentNewsfeed;
