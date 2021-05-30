import React, { useEffect, useRef, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import FrameLoading from '../frameLoading/FrameLoading';
import './SelectLoadmore.css';

interface Props {
  className?: string;
  selected: any;
  setSelected: any;
  data: any[];
  full: boolean;
  loading: boolean;
  page?: number;
  value: string;
  setValue?: any;
  defaultValue: string;
  callbackSearch?: any;
  maxLength?: number;
  validation?: any;
}

const SelectLoadmore: React.FC<Props> = (props) => {
  const {
    className,
    selected,
    setSelected,
    data,
    full,
    loading,
    page,
    value,
    setValue,
    defaultValue,
    callbackSearch,
    maxLength,
    validation,
  } = props;

  const [show, setShow] = useState(false);

  const ref = useRef<any>(null);
  const timeout = useRef<any>(0);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleChangeValue = (e: any) => {
    const v = e.target.value;
    if (validation && !validation(e)) return;

    setValue(v);
    if (timeout.current) clearTimeout(timeout.current);
    const trimmedSearchName = v.trim();
    timeout.current = setTimeout(() => {
      callbackSearch?.(trimmedSearchName, 1);
    }, 1000);
  };

  const handleLoadmore = () => {
    if (loading || full) return;
    callbackSearch?.(value, (page || 1) + 1);
  };

  const handleSelect = (item: any) => {
    if (item) setValue?.(item.name);
    else setValue?.('');
    setShow(false);
    setSelected(item);
  };

  let render;

  if (data.length === 0) {
    if (loading)
      render = (
        <div className="d-flex align-items-center" style={{ height: '80%' }}>
          <FrameLoading size="sm" />
        </div>
      );
    else render = <div className="select-suggest-no-results">No results</div>;
  } else {
    render = (
      <div>
        {data.map((item: { id: string; name: string }) => {
          if (item === null)
            return (
              <div
                key="all"
                onClick={() => handleSelect(null)}
                className={`select-suggest-item ${selected === null ? 'active' : ''}`}
              >
                {defaultValue}
              </div>
            );
          return (
            <div
              onClick={() => handleSelect(item)}
              key={item.id}
              className={`select-suggest-item ${selected?.id === item.id ? 'active' : ''}`}
            >
              {item.name}
            </div>
          );
        })}
        <Waypoint onEnter={handleLoadmore} />
        <div style={{ height: 6 }}></div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`d-flex align-items-center ${className}`} style={{ position: 'relative', height: 35 }}>
      <input
        value={value}
        onChange={handleChangeValue}
        onClick={() => setShow(true)}
        className="form-control pr-4 select-loadmore"
        placeholder={defaultValue}
        readOnly={setValue === undefined}
        maxLength={maxLength}
      />
      <i
        onClick={() => setShow(true)}
        className="fa fa-angle-down cursor-pointer"
        style={{ position: 'absolute', right: 10 }}
      />
      {show && <div className="select-suggest-wrapper">{render}</div>}
    </div>
  );
};

export default SelectLoadmore;
