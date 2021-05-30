import { CInput } from '@coreui/react';
import { useEffect, useRef, useState } from 'react';

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
  timeoutSearch?: number;
  validate?: any;
  minLengthSearch?: number;
  isNew?: boolean;
}

const Search: React.FC<Props> = (props) => {
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
    validate,
    isNew,
  } = props;
  let { timeoutSearch, minLengthSearch }: any = props;
  if (!timeoutSearch) timeoutSearch = 1000;
  if (!minLengthSearch) minLengthSearch = 1;

  const timeout = useRef<any>(0);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    if (firstTime) {
      if (timeout.current) clearTimeout(timeout.current);
      const trimmedSearchName: any = searchName?.trim();
      if (trimmedSearchName?.length >= minLengthSearch || searchEmpty) {
        timeout.current = setTimeout(() => {
          callbackSearch?.(trimmedSearchName);
        }, timeoutSearch);
      }
    } else setFirstTime(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  const handleChange = (e: any) => {
    if (validate && !validate(e)) return;
    const value = e.target.value;
    setSearchName?.(value);
    !value.trim() && callbackEmpty && callbackEmpty?.();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (timeout.current) clearTimeout(timeout.current);
      const trimmedSearchName: any = searchName?.trim();
      if (trimmedSearchName?.length >= minLengthSearch || searchEmpty) {
        callbackSearch?.(trimmedSearchName);
      }
    }
  };

  return (
    <div className={className} style={{ position: 'relative' }}>
      <CInput
        style={{ paddingLeft: 32, ...inputStyle }}
        type="text"
        placeholder={placeholder || 'Search'}
        value={searchName}
        maxLength={50}
        onChange={handleChange}
        onKeyPress={handleKeyDown}
      />
      {isNew ? (
        <i
          style={{ position: 'absolute', left: 10, top: 8, color: 'var(--nightblue-100)', fontSize: 20 }}
          className="hb-icon-search"
        />
      ) : (
        <i style={{ position: 'absolute', left: 10, top: 11, color: '#777' }} className="fa fa-search icon" />
      )}

      {dropdown}
    </div>
  );
};

export default Search;
