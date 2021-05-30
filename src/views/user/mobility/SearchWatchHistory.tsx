import { CInput } from '@coreui/react';
import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  searchName?: string;
  setSearchName?: (params: any) => void;
  dropdown?: any;
  callbackSearch?: (params: any) => void;
  callbackEmpty?: () => void;
  placeholder?: string;
  searchEmpty?: boolean;
  onKeyPress?: (params: any) => void
}

const SearchWatchHistory: React.FC<Props> = (props) => {
  const {
    className,
    searchName,
    setSearchName,
    dropdown,
    callbackSearch,
    callbackEmpty,
    placeholder,
    searchEmpty,
    onKeyPress
  } = props;
  const timeout = useRef<any>(0);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    const trimmedSearchName = searchName?.trim();
    if (trimmedSearchName || searchEmpty) {
      timeout.current = setTimeout(() => {
        callbackSearch?.(trimmedSearchName);
      }, 1000);
    }
  }, [searchName]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchName?.(value);
    !value.trim() && callbackEmpty && callbackEmpty?.();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (timeout.current) clearTimeout(timeout.current);
      const trimmedSearchName = searchName?.trim();
      if (trimmedSearchName || searchEmpty) {
        callbackSearch?.(trimmedSearchName);
      }
    }
  };

  return (
    <div className={className} style={{ position: 'relative', height: 40 }}>
      <CInput
        style={{ paddingLeft: 32 }}
        type="text"
        placeholder={placeholder || 'Search'}
        value={searchName}
        maxLength={50}
        onChange={handleChange}
        onKeyPress={(params) => onKeyPress?.(params)}
      />
      <i style={{ position: 'absolute', left: 10, top: 11, color: '#777' }} className="fa fa-search icon"></i>
      {dropdown}
    </div>
  );
};

export default SearchWatchHistory;
