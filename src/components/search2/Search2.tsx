import { CInput } from '@coreui/react';
import React, { useImperativeHandle } from 'react';
import { useEffect, useRef, useState } from 'react';

interface Props {
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

const Search2 = React.forwardRef<RefProps, Props>((props, ref) => {
  const {
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
      }, 100);
    }
    // eslint-disable-next-line
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
    <div className={className} style={{ position: 'relative' }}>
      <CInput
        innerRef={inputRef}
        style={{ paddingLeft: 32 }}
        type="text"
        placeholder={placeholder || 'Search'}
        value={searchName}
        maxLength={50}
        onChange={handleChange}
        onKeyPress={handleKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <i style={{ position: 'absolute', left: 10, top: 11, color: '#777' }} className="fa fa-search icon"></i>
      {dropdown}
    </div>
  );
});

export default Search2;
