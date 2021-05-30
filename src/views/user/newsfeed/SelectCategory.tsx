import React, { useEffect } from 'react';
import config from '../../../config';
import ContentNewsfeed from './ContentNewsfeed';
import YourTopicsIsSelected from './YourTopicsIsSelected';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ls } from '../../../extensions';
import { HBButton, HBButtonSmall, HBSearch } from '../../../hbBaseClass';
import './Newsfeed.scss';
import { cloneNewsfeedYourTopics, setNewsfeedTopics, updateNewsfeedYourTopics } from '../../../store/newsfeed/actions';

const SelectCategory: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const history = useHistory();

  const email = useSelector((state: any) => state.auth.email);
  const hasBack = ls.get(`has-back-${email}`);

  const { top_topics, top_search_keywords, your_topics } = useSelector((state: any) => state.newsfeed);

  useEffect(() => {
    ls.set(`screen-${email}`, '/newsfeed/select-category');

    if (top_topics.length === 0)
      callApi(
        {
          method: 'get',
          api: config.rest.getNewsfeedCategories(),
          loading: true,
        },
        (response) => {
          const { data, status } = response;
          if (status === SUCCESS) {
            dispatch(setNewsfeedTopics(data));
          }
        },
      );
  }, []);

  const saveSetting = (item: { id: string; name: string }) => {
    dispatch(updateNewsfeedYourTopics(item));
  };

  const startNewsfeed = () => {
    callApi(
      {
        method: 'post',
        api: '/api/v1/newsfeed/starts',
        loading: true,
        body: {
          keywords: your_topics.map((item: any) => item.id),
        },
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          ls.set(`has-back-${email}`, 'ok');
          dispatch(cloneNewsfeedYourTopics('Real'));
          ls.set(`screen-${email}`, '/newsfeed');
          history.push('/newsfeed');
        }
      },
    );
  };

  return (
    <>
      <div className="hb-wrapper">
        <div className="hb-mx-20">
          <div className="d-flex justify-content-between hb-my-28">
            <HBButtonSmall
              style={{ visibility: hasBack ? 'visible' : 'hidden' }}
              onClick={() => {
                dispatch(cloneNewsfeedYourTopics('Fake'));
                ls.set(`screen-${email}`, '/newsfeed');
                history.push('/newsfeed');
              }}
            >
              <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
            </HBButtonSmall>
          </div>
          <h1 style={{ color: 'white', textAlign: 'center' }}>Themenauswahl</h1>
          <div className="hb-select-category-intro">
            Zeigen Sie uns hier, für welche Themen Sie sich interessieren. Bitte wählen Sie mindestens drei Themen aus.
          </div>
          <HBSearch
            handleClick={() => history.push('/newsfeed/select-category/search')}
            readOnly
            placeholder="Nach Themen suchen"
            className="hb-select-category-search"
          />
          <div className="row p-0">
            <div className="col-md-8">
              <ContentNewsfeed
                label="Top Themen"
                your_topics={your_topics}
                saveSetting={saveSetting}
                data={top_topics}
              />
              <ContentNewsfeed
                label="Meistgesucht"
                your_topics={your_topics}
                saveSetting={saveSetting}
                data={top_search_keywords}
              />
            </div>
            <div className="col-md-4">
              <YourTopicsIsSelected your_topics={your_topics} saveSetting={saveSetting} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 100 }}>
        <div className="hb-start-newsfeed-wrapper">
          <HBButton
            style={{ width: '100%', padding: '12px 0' }}
            className="hb-start-newsfeed"
            onClick={startNewsfeed}
            disabled={your_topics.length < 3}
          >
            Pflege Magazin erstellen
          </HBButton>
        </div>
      </div>
    </>
  );
};

export default SelectCategory;
