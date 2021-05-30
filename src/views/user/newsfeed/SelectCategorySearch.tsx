import React, { useEffect, useRef, useState } from 'react';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HBButtonSmall, HBSearch } from '../../../hbBaseClass';
import { updateNewsfeedYourTopics } from '../../../store/newsfeed/actions';
import './Newsfeed.scss';
import ContainterEllipse from '../containers/ContainerEllipse';
import { includes } from '../../../utils';

const SelectCategorySearch: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const history = useHistory();
  const [searchName, setSearchName] = useState('');
  const [searchSuggestionNames, setSearchSuggestionNames] = useState([]);
  const searchRef = useRef<any>(null);
  const { your_topics } = useSelector((state: any) => state.newsfeed);

  const getNewsfeedSearch = (value: string) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getNewsfeedSearch(value),
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS && searchName.trim()) {
          setSearchSuggestionNames(data.categories.filter((item: any) => !includes(your_topics, item)));
        }
      },
    );
  };

  const saveSetting = (item: { id: string; name: string }) => {
    dispatch(updateNewsfeedYourTopics(item));
    history.push('/newsfeed/select-category');
  };

  const showSuggestionName = () => {
    if (searchSuggestionNames.length === 0) return <div className="search-group-item disabled">-</div>;
    return searchSuggestionNames.map((item: { id: string; name: string }, index: number) => (
      <div
        className="search-group-item"
        style={index === searchSuggestionNames.length - 1 ? { border: 'none' } : {}}
        key={item.id}
        onClick={() => saveSetting(item)}
      >
        <i className="hb-icon-zoom-in hb-select-category-icon-search" />
        {item.name}
      </div>
    ));
  };

  const searchParams = {
    innerRef: searchRef,
    clearBtn: true,
    searchName,
    setSearchName,
    callbackSearch: getNewsfeedSearch,
    callbackEmpty: () => setSearchSuggestionNames([]),
  };

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <ContainterEllipse>
      <div>
        <div className="hb-mx-20">
          <div className="d-flex justify-content-end hb-my-28">
            <HBButtonSmall onClick={() => history.push('/newsfeed/select-category')}>
              <i className="hb-icon-cross hb-icon-lg" /> Schließen
            </HBButtonSmall>
          </div>
        </div>
        <div className="hb-card">
          <div className="hb-margin-30" style={{ marginBottom: 12 }}>
            <HBSearch {...searchParams} placeholder="Suchbegriff" />
            <div className="hb-select-category-title">Suchergebnisse</div>
            <div className="hb-select-category-search-suggestion">
              <div className="hb-scroll" style={{ maxHeight: 320, marginRight: -10, paddingRight: 5 }}>
                {showSuggestionName()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainterEllipse>
  );
};

export default SelectCategorySearch;
