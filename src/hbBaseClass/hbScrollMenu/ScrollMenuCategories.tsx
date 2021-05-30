import React, { useRef, useState } from 'react';
import HBScrollMenu from './ScrollMenu';
import { topicsScrollSetting } from '../../config';
import HBButtonCategory from '../hbButton/HBButtonCategory';
import HBButtonArrow from '../hbButton/HBButtonArrow';
import './ScrollMenu.scss';

interface Props {
  topic: string;
  data: any;
  goto: any;
  hideNumber?: boolean;
}

const ScrollMenuCategories: React.FC<Props> = (props) => {
  const ref = useRef<any>(null);

  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowRight, setArrowRight] = useState(false);

  const onFirstItemHidden = () => {
    if (!arrowLeft) setArrowLeft(true);
  };

  const onLastItemHidden = () => {
    if (!arrowRight) setArrowRight(true);
  };

  const onFirstItemVisible = () => {
    if (arrowLeft) setArrowLeft(false);
  };

  const onLastItemVisible = () => {
    if (arrowRight) setArrowRight(false);
  };

  const { topic, data, goto, hideNumber } = props;

  return (
    <div className="hb-mx-20">
      <div className="hb-scroll-menu-categories-wrapper">
        <div style={{ width: 'calc(100% - 100px)' }}>
          <HBScrollMenu
            {...topicsScrollSetting}
            ref={ref}
            onFirstItemHidden={onFirstItemHidden}
            onLastItemHidden={onLastItemHidden}
            onFirstItemVisible={onFirstItemVisible}
            onLastItemVisible={onLastItemVisible}
            data={data.map((item: any) => (
              <HBButtonCategory
                key={item.id}
                active={item.id === topic}
                count={item.number_of_record || item.amount_new_videos}
                name={item.name}
                onClick={() => goto(item.id)}
                hideNumber={hideNumber}
              />
            ))}
          />
        </div>
        {data?.length > 0 && (
          <div className="d-flex" style={{ minWidth: 100, justifyContent: 'flex-end' }}>
            <HBButtonArrow
              disabled={!arrowLeft}
              direction="left"
              handleClick={() => ref.current?.handleArrowClick?.()}
            />
            <HBButtonArrow
              disabled={!arrowRight}
              direction="right"
              handleClick={() => ref.current?.handleArrowClickRight?.()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollMenuCategories;
