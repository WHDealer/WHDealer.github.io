import { useEffect, useRef, useState } from 'react';
import React, { useImperativeHandle } from 'react';
import './HBSearch.scss';

interface Props {
  inputStyle?: any;
  className?: string;
  searchName?: string;
  setSearchName?: (params: any) => void;
  dropdown?: any;
  callbackSearch?: (params: any) => void;
  callbackEmpty?: () => void;
  placeholder?: string;
  searchEmpty?: boolean;
  onKeyPress?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  isFocus?: boolean;
}

interface RefProps {
  focus: () => void;
  blur: () => void;
}

const HBSearch2 = React.forwardRef<RefProps, Props>((props, ref) => {
  const {
    inputStyle,
    className,
    searchName,
    setSearchName,
    dropdown,
    callbackSearch,
    callbackEmpty,
    placeholder,
    searchEmpty,
    onBlur,
    onFocus,
  } = props;
  const timeout = useRef<any>(0);

  const [isEnter, setIsEnter] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef?.current?.focus?.();
    },
    blur: () => {
      inputRef?.current?.blur?.();
    },
  }));

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    const trimmedSearchName = searchName?.trim();
    if (trimmedSearchName || searchEmpty) {
      timeout.current = setTimeout(() => {
        callbackSearch?.(trimmedSearchName);
      }, 500);
    }
  }, [searchName]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchName?.(value);
    setIsEnter(false);
    !value.trim() && callbackEmpty && callbackEmpty?.();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      props?.onKeyPress?.(searchName?.trim());
      setIsEnter(true);
    }
  };

  return (
    <div
      className={className}
      style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
    >
      <input
        ref={inputRef}
        style={inputStyle}
        className="hb-search-input"
        type="text"
        placeholder={placeholder || 'Suche'}
        value={searchName}
        maxLength={50}
        onChange={handleChange}
        onKeyPress={handleKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <i className="hb-icon-search hb-search-icon" />
      {dropdown}
    </div>
  );
});

export default HBSearch2;
