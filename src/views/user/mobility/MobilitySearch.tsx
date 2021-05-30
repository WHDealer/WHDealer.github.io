import React, { useEffect, useRef, useState } from 'react';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HBButtonIcon, HBButtonSmall, HBModalConfirm, HBSearch } from '../../../hbBaseClass';
import styles from './MobilitySearch.module.scss';

const MobilitySearch: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const history = useHistory();
  const [searchName, setSearchName] = useState('');
  const [searchSuggestionNames, setSearchSuggestionNames] = useState<any[]>([]);
  const searchRef = useRef<any>(null);

  const [showModal, setShowModal] = useState(false);

  const removeKeyword = (keywordId?: any) => {
    if (keywordId) {
      setSearchSuggestionNames(searchSuggestionNames.filter((item: any) => item.id !== keywordId));
    } else {
      setSearchSuggestionNames([]);
    }
    callApi(
      {
        loading: false,
        method: 'delete',
        api: keywordId
          ? config.rest.removeSearchHistoryKeyword(keywordId)
          : config.rest.removeAllSearchHistoryKeywords(),
      },
      (response) => {},
    );
  };

  const startSearch = (item: { id: string; keyword: string }) => {
    history.push(`/mobility?search=${item.keyword}`);
  };

  const showSuggestionName = () => {
    const lower = searchName.toLowerCase();
    const arr = searchSuggestionNames.filter((item) => item.keyword.includes(lower));
    if (arr.length === 0) return <div className="search-group-item disabled">-</div>;
    return arr.map((item: { id: string; keyword: string }, index: number) => {
      let splitKeywords;
      let fullKeywords: any = [];
      if (lower) {
        splitKeywords = item.keyword.split(lower);
        splitKeywords.forEach((item1) => {
          fullKeywords.push(<span style={{ whiteSpace: 'pre' }}>{item1}</span>);
          fullKeywords.push(<span style={{ whiteSpace: 'pre', color: 'var(--violet-80)' }}>{lower}</span>);
        });
        fullKeywords.splice(fullKeywords.length - 1, 1);
      }
      return (
        <div
          className={`search-group-item d-flex align-items-center justify-content-between ${styles.suggestItemWrapper}`}
          style={index === arr.length - 1 ? { border: 'none' } : {}}
          key={item.id}
        >
          <div className={`d-flex align-items-center ${styles.suggestItemContent}`} onClick={() => startSearch(item)}>
            <i className="hb-icon-zoom-in hb-select-category-icon-search" />
            {fullKeywords.length > 0 ? fullKeywords : item.keyword}
          </div>
          <HBButtonIcon
            circle={{ color: '#d3d4d5', size: 24 }}
            icon="cross"
            size={18}
            color="var(--violet-100)"
            onClick={(e: any) => removeKeyword(item.id)}
            iconStyle={{ fontWeight: 'bold' }}
          />
        </div>
      );
    });
  };

  const searchParams = {
    innerRef: searchRef,
    clearBtn: true,
    searchName,
    setSearchName,
    handleEnter: (keyword: string) => startSearch({ id: '', keyword }),
  };

  useEffect(() => {
    searchRef.current.focus();
    callApi(
      {
        method: 'get',
        api: config.rest.getHistoriesKeywords(''),
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setSearchSuggestionNames(
            data.map((item: any) => {
              return { ...item, keyword: item.keyword.toLowerCase() };
            }),
          );
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showClear = searchSuggestionNames.length > 0 && !searchName;

  return (
    <div>
      <HBModalConfirm
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="Suchverlauf löschen"
        content="Sind Sie sicher, dass Sie Ihren Suchverlauf vollständig löschen möchten?"
        up="Ja, löschen"
        down="Abbrechen"
        upCallback={() => {
          setShowModal(false);
          removeKeyword();
        }}
        downCallback={() => setShowModal(false)}
      />
      <div className="hb-mx-20">
        <div className="d-flex justify-content-end hb-my-28">
          <HBButtonSmall onClick={() => history.push('/mobility')}>
            <i className="hb-icon-cross hb-icon-lg" /> Schließen
          </HBButtonSmall>
        </div>
      </div>
      <div className="hb-card">
        <div
          className={`hb-margin-30 ${styles.searchArea}`}
          // style={{ paddingBottom: searchSuggestionNames.length > 0 ? 0 : 20 }}
        >
          <HBSearch {...searchParams} placeholder="Suchbegriff" />
          <div>
            <div className="hb-select-category-title d-flex justify-content-between">
              {showClear ? 'Zuletzt gesucht' : 'Suchergebnisse'}
              <HBButtonSmall
                style={{ visibility: !showClear ? 'hidden' : 'visible' }}
                onClick={() => setShowModal(true)}
              >
                Verlauf löschen
              </HBButtonSmall>
            </div>
            <div className="hb-select-category-search-suggestion">
              <div className={`violet hb-scroll ${styles.listSuggestItems}`}>{showSuggestionName()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilitySearch;
