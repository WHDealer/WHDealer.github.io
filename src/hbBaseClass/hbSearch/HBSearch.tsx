import { useEffect, useRef, useState } from 'react';
import './HBSearch.scss';
import styles from './HBSearch.module.scss';

interface Props {
  innerRef?: any;
  inputStyle?: any;
  className?: string;
  searchName?: string;
  setSearchName?: (params: any) => void;
  dropdown?: any;
  callbackSearch?: (params: any) => void;
  callbackEmpty?: () => void;
  placeholder?: string;
  searchEmpty?: boolean;
  timeoutSearch?: number;
  validate?: any;
  minLengthSearch?: number;
  handleClick?: any;
  readOnly?: any;
  handleEnter?: any;
  clearBtn?: boolean;
  nightBlue?: boolean;
}

const HBSearch: React.FC<Props> = (props) => {
  const {
    innerRef,
    inputStyle,
    className,
    searchName,
    setSearchName,
    dropdown,
    callbackSearch,
    callbackEmpty,
    placeholder,
    searchEmpty,
    validate,
    handleClick,
    readOnly,
    handleEnter,
    clearBtn,
    nightBlue,
  } = props;
  let { timeoutSearch, minLengthSearch }: any = props;
  if (timeoutSearch === undefined) timeoutSearch = 1000;
  if (!minLengthSearch) minLengthSearch = 1;

  const timeout = useRef<any>(0);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    if (firstTime) {
      if (timeout.current) clearTimeout(timeout.current);
      const trimmedSearchName: any = searchName?.trim();
      if (timeoutSearch && (trimmedSearchName?.length >= minLengthSearch || searchEmpty)) {
        timeout.current = setTimeout(() => {
          callbackSearch?.(trimmedSearchName);
        }, timeoutSearch);
      }
    } else setFirstTime(true);
  }, [searchName]);

  const handleChange = (e: any) => {
    if (validate && !validate(e)) return;
    const value = e.target.value;
    setSearchName?.(value);
    !value.trim() && callbackEmpty && callbackEmpty?.();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      const trimmedSearchName: any = searchName?.trim();
      if (trimmedSearchName && handleEnter) handleEnter(trimmedSearchName);
      else {
        if (timeout.current) clearTimeout(timeout.current);
        if (trimmedSearchName?.length >= minLengthSearch || searchEmpty) {
          callbackSearch?.(trimmedSearchName);
        }
      }
    }
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: readOnly ? 'pointer' : 'text',
      }}
      onClick={handleClick}
    >
      {readOnly ? (
        <>
          <div className="hb-search-input" style={inputStyle}>
            {placeholder || 'Suche'}
          </div>
          <i className="hb-icon-search hb-search-icon" />
        </>
      ) : (
        <>
          <input
            ref={innerRef}
            className={`${nightBlue ? styles.HBSearch : 'hb-search-input'}`}
            style={inputStyle}
            type="text"
            placeholder={placeholder || 'Suche'}
            value={searchName}
            maxLength={50}
            onChange={handleChange}
            onKeyPress={handleKeyDown}
          />
          <i
            className={`${nightBlue ? 'hb-icon-search' + ' ' + styles.hBIconSearch : 'hb-icon-search hb-search-icon'}`}
          />
          {clearBtn && searchName && (
            <i
              className={`${
                nightBlue ? 'hb-icon-cross' + ' ' + styles.HBSearchClear : 'hb-icon-cross hb-search-clear'
              }`}
              onClick={() => setSearchName?.('')}
            />
          )}
          {dropdown}
        </>
      )}
    </div>
  );
};

export default HBSearch;
