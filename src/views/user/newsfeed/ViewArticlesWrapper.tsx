import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import config, { topicsScrollSetting } from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import Article from './Article';
import { useDispatch, useSelector } from 'react-redux';
import Frame from '../mobility/Frame';
import { Waypoint } from 'react-waypoint';
import { loadingSmall, ls } from '../../../extensions';
import {
  HBButtonSmall,
  HBButtonCategory,
  HBButtonArrow,
  HBScrollMenu,
  HBScrollMenuCategories,
  HBButtonFull,
  HBButton,
} from '../../../hbBaseClass';
import ModalArticles from './ModalArticles';
import './Newsfeed.scss';

const pageSize = 12;

interface Props {
  isFavorite: boolean;
}

const ViewArticles: React.FC<Props> = (props) => {
  const { isFavorite }: any = props;

  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const history = useHistory();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const topic = query.get('topic') || 'all';

  const [topics, setTopics] = useState<any>({ data: [], loading: true });
  const [articles, setArticles] = useState<any>({ data: [], loading: true, full: false, page: 0 });
  const [modal, setModal] = useState({ show: false, category: { id: '', name: '' } });

  const email = useSelector((state: any) => state.auth.email);
  // const deviceId = ls.get('device_id');

  const getAllArticles = (topic: string, page: number) => {
    callApi(
      {
        method: 'get',
        api:
          topic === 'all'
            ? (isFavorite ? config.rest.getNewsfeedFavoriteArticles : config.rest.getNewsfeedArticles)(pageSize, page)
            : (isFavorite ? config.rest.getNewsfeedFavoriteArticlesById : config.rest.getNewsfeedArticlesById)(
                topic,
                pageSize,
                page,
              ),
        loading: page === 1,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setArticles((articles: any) => {
            return {
              data: page === 1 ? data.articles : [...articles.data, ...data.articles],
              full: data.articles.length < pageSize,
              loading: false,
              page: page,
            };
          });
        }
      },
    );
  };

  const getAllTopics = () => {
    callApi(
      {
        method: 'get',
        api: isFavorite ? config.rest.getNewsfeedFavoriteCategories() : config.rest.getNewsfeedSeletectedCategories(),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setTopics((topics: any) => {
            const newTopics = { ...topics, loading: false };
            newTopics.data = [{ id: 'all', name: 'alle Themen', number_of_record: data.total }, ...data.categories];
            return newTopics;
          });
          getAllArticles(topic, 1);
        } else {
          setTopics({ ...topics, loading: false });
        }
      },
    );
  };

  // const updateDevice = async (device: number) => {
  //   let pushToken = ls.get('push_token');
  //   ls.set('registed', false);

  //   await axios
  //     .put(config.rest.updateDevice(device), {
  //       email_address: auth,
  //       phone_number: '',
  //       push_token: pushToken || '',
  //       subscribed: '',
  //       last_activate: '',
  //       first_session: '',
  //       device_name: 'ReactJS',
  //       sessions: '',
  //       app_version: '',
  //       country: '',
  //       ip_address: '',
  //       sdk_version: '',
  //       lat: '',
  //       long: '',
  //       usage_duration: '',
  //       language_code: '',
  //       external_user_id: '',
  //       segments: '',
  //       tags: '',
  //     })
  //     .then(function (response) {
  //       if (response.data.message.status === 'success') {
  //         if (pushToken && deviceId) {
  //           ls.set('registed', true);
  //         }
  //       }
  //     });
  //   // .catch(function (error) {
  //   //   console.log(error);
  //   // });
  // };

  // useEffect(() => {
  //   updateDevice(deviceId);
  // }, []);

  useEffect(() => {
    const screen = ls.get(`screen-${email}`);
    if (!screen) {
      history.push('/newsfeed/intro');
      return;
    }
    if (!isFavorite && screen === '/newsfeed/select-category') {
      history.push('/newsfeed/select-category');
      return;
    }
    if (topics.data.length === 0) getAllTopics();
    else {
      setArticles({ ...articles, loading: true, full: false, page: 0 });
      getAllArticles(topic, 1);
      window.scrollTo(0, 0);
    }
  }, [topic]);

  const loadMoreArticles = () => {
    if (articles.loading || articles.full) return;
    setArticles({ ...articles, loading: true });
    getAllArticles(topic, articles.page + 1);
  };

  const goto = (topic: string) => {
    if (topic === 'all') history.push(isFavorite ? '/newsfeed/favorite' : '/newsfeed');
    else history.push(`/newsfeed/${isFavorite ? 'favorite' : ''}?topic=${topic}`);
  };

  const nextTopicIndex = topics.data.findIndex((item: any) => item.id === topic);
  const nextTopic = topics.data[nextTopicIndex === topics.data.length - 1 ? 0 : nextTopicIndex + 1];

  return (
    <>
      <ModalArticles
        setArticlesParent={setArticles}
        {...modal}
        handleClose={() => setModal({ ...modal, show: false })}
      />
      <div className="hb-mx-20">
        <div className="d-flex justify-content-between hb-my-28">
          {isFavorite ? (
            <HBButtonSmall onClick={() => history.push('/newsfeed')}>
              <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
            </HBButtonSmall>
          ) : (
            <>
              <HBButtonSmall onClick={() => history.push('/newsfeed/select-category')}>Themenauswahl</HBButtonSmall>
              <HBButtonSmall onClick={() => history.push('/newsfeed/favorite')}>
                <i className="hb-icon-heart-r hb-icon-md" />
                Gespeicherte
              </HBButtonSmall>
            </>
          )}
        </div>
      </div>
      <h1 style={{ color: 'white', textAlign: 'center' }}>{isFavorite ? 'Gespeicherte Artikel' : 'Magazin'}</h1>
      <HBScrollMenuCategories
        data={topics.data.filter((item: any) => item.id !== '1')}
        topic={topic}
        goto={goto}
        hideNumber={isFavorite}
      />
      {!articles.loading && articles.data.length === 0 && <div className="hb-no-items">Keine artikel</div>}
      {articles.data.length > 0 &&
        (!isFavorite ? (
          <div className="hb-card">
            <div className="row ">
              {articles.data.map((article: any, index: number) => (
                <Article setArticles={setArticles} {...article} index={index} key={index} setModal={setModal} />
              ))}
            </div>
          </div>
        ) : (
          <div className="hb-card">
            <div className="hb-card-header">Kürzlich hinzugefügt</div>
            <div className="row">
              {articles.data.slice(0, 3).map((article: any, index: number) => (
                <Article setArticles={setArticles} {...article} index={index} key={index} setModal={setModal} />
              ))}
            </div>
            {articles.data.length > 3 && (
              <>
                <div className="hb-card-header old">Ältere Beiträge</div>
                <div className="row">
                  {articles.data.slice(3).map((article: any, index: number) => (
                    <Article
                      setArticles={setArticles}
                      {...article}
                      index={index}
                      key={index}
                      mini={true}
                      setModal={setModal}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      {articles.page !== 0 && articles.loading && <Frame size="large" render={loadingSmall} />}
      <Waypoint onEnter={loadMoreArticles} />
      {articles.full && (
        <div className="text-center mb-2">
          <HBButton onClick={() => goto(nextTopic.id)} style={{ padding: '10px 20px' }}>
            Nächstes Thema: {nextTopic.name}
          </HBButton>
        </div>
      )}
    </>
  );
};

export default ViewArticles;
