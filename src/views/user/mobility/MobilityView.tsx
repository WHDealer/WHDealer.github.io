import React, { useRef } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import config, { topicsScrollSetting } from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import MobilityVideo from './MobilityVideo';
import { useDispatch, useSelector } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import { loadingSmall, ls } from '../../../extensions';
import Frame from './Frame';
import {
  HBButton,
  HBButtonArrow,
  HBButtonCategory,
  HBButtonFull,
  HBButtonIcon,
  HBButtonSmall,
  HBScrollMenuCategories,
} from '../../../hbBaseClass';
import Trainer from './Trainer';
import styles from './MobilityView.module.scss';
import Tippy from '@tippyjs/react/headless';
import MobilityTooltip from './MobilityTooltip';

interface Props {
  location: { search: string };
}

const pageSize = 12;

const MobilityViews: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const query = new URLSearchParams(props.location?.search);
  const history = useHistory();
  const postureType = useSelector((state: any) => state.settings.posture_type);

  const topic = query.get('topic') || 'all';
  const searchName = query.get('search') || '';
  const [topics, setTopics] = useState<any>({ data: [], loading: true });
  const [videos, setVideos] = useState({ data: [], loading: true, full: false, page: 0 });
  const [trainers, setTrainers] = useState({ data: [], loading: true, full: false, page: 0, amount_trainers: 0 });
  const [libary, setLibrary] = useState<any>(null);
  const email = useSelector((state: any) => state.auth.email);
  const postureType2 = ls.get(`posture-${email}`);
  const tooltip = ls.get(`mobility-tooltip-${email}`);
  const [showTooltip, setShowTooltip] = useState(false);
  const attentions = ls.get('mobility-attentions') || [];

  const confirmTooltip = () => {
    ls.set(`mobility-tooltip-${email}`, 'ok');
    setShowTooltip(false);
  };

  const getAllTrainers = (page: number) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getAllTrainers(page, 12),
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setTrainers((trainers: any) => {
            return {
              data: data.trainers,
              full: data.trainers.length < pageSize,
              loading: false,
              page: page,
              amount_trainers: data.amount_trainers,
            };
          });
        }
      },
    );
  };

  const getAllVideos = (searchName: string, page: number) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getSearchVideos('', searchName, topic, pageSize, page, postureType),
        loading: page === 1,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setVideos({
            data: page === 1 ? data.videos : [...videos.data, ...data.videos],
            full: data.videos.length < pageSize,
            loading: false,
            page: page,
          });
          if (!tooltip) {
            setShowTooltip(true);
          }
        }
      },
    );
  };

  const getAllTopics = () => {
    callApi(
      {
        method: 'get',
        api: config.rest.getAllMobilityCategories(postureType),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setTopics((topics: any) => {
            const newTopics = { ...topics, loading: false };
            newTopics.data = [
              {
                id: 'all',
                name: 'alle Videos',
                amount_new_videos: data.total_new_videos,
              },
              ...data.categories,
            ];
            return newTopics;
          });
          getAllVideos(searchName, 1);
        }
      },
    );
  };

  useEffect(() => {
    if (!postureType2) {
      history.push('/mobility/intro');
      return;
    }
    if (!['all', 'sit', 'lie', 'standing'].includes(postureType) || !attentions.includes(email)) {
      history.push('/mobility/posture');
      return;
    }

    if (topics.data.length === 0) getAllTopics();
    else {
      setVideos({ ...videos, loading: true, full: false, page: 0 });
      getAllVideos(searchName, 1);
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  useEffect(() => {
    if (searchName) return;
    callApi(
      {
        method: 'get',
        api: '/api/v1/mobility/libraries',
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setLibrary(data);
        }
      },
    );
    getAllTrainers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreVideos = () => {
    if (videos.loading || videos.full) return;
    setVideos({ ...videos, loading: true });
    getAllVideos(searchName, videos.page + 1);
  };

  const goto = (topic: string) => {
    if (topic === 'all') history.push('/mobility');
    else history.push(`/mobility/?topic=${topic}`);
  };

  const nextTopicIndex = topics.data.findIndex((item: any) => item.id === topic);
  const nextTopic = topics.data[nextTopicIndex === topics.data.length - 1 ? 0 : nextTopicIndex + 1];

  return (
    <>
      <div className="hb-mx-20">
        <div className="d-flex hb-my-28" style={{ justifyContent: 'space-between' }}>
          {searchName ? (
            <HBButtonSmall onClick={() => history.goBack()}>
              <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
            </HBButtonSmall>
          ) : (
            <>
              <MobilityTooltip
                showTooltip={showTooltip}
                confirmTooltip={confirmTooltip}
                children={
                  <HBButtonSmall
                    className={styles.btnVideoFilter}
                    style={{ zIndex: showTooltip ? 40 : 1 }}
                    onClick={() => history.push('/mobility/posture')}
                  >
                    Videos filtern
                  </HBButtonSmall>
                }
              />
              <div className="d-flex align-items-center">
                <HBButtonIcon
                  icon="search"
                  size={24}
                  color="var(--violet-10)"
                  onClick={() => history.push('/mobility/search')}
                  style={{ fontWeight: 800, margin: '2px 1vw 0' }}
                />
                <Tippy
                  interactive={true}
                  trigger="click"
                  className="tippy"
                  render={(attrs) => (
                    <div className={`${styles.tippy} box`} {...attrs}>
                      <div
                        className={styles.tippyItem}
                        style={{ width: '100%', borderBottom: '1px solid var(--petrol-5)' }}
                        onClick={() => history.push('/mobility/saved')}
                      >
                        <div>{libary?.is_save_number || 0}</div>
                        Geschichte Videos
                      </div>
                      <div
                        className={styles.tippyItem}
                        style={{ width: '100%', borderBottom: '1px solid var(--petrol-5)' }}
                        onClick={() => history.push('/mobility/saved?history=true')}
                      >
                        <div>{libary?.watch_history_number || 0}</div>
                        Angesehene Videos
                      </div>
                      <div
                        className={styles.tippyItem}
                        style={{ width: '100%' }}
                        onClick={() => history.push('/mobility/all-trainers?is_mine=true')}
                      >
                        <div>{libary?.trainer_number || 0}</div>
                        Ihre Trainer
                      </div>
                      <div className={styles.arrow} data-popper-arrow></div>
                    </div>
                  )}
                  popperOptions={{
                    modifiers: [
                      {
                        name: 'arrow',
                        options: {
                          element: null,
                        },
                      },
                    ],
                  }}
                >
                  <div className={styles.bibliothek}>
                    <i className="hb-icon-heart-r hb-icon-md" />
                    Video Bibliothek
                  </div>
                </Tippy>
              </div>
            </>
          )}
        </div>
      </div>

      {searchName ? (
        <h1 className={styles.title} style={{ color: 'white', textAlign: 'center', marginBottom: 40 }}>
          {searchName}
        </h1>
      ) : (
        <h1 className={styles.title} style={{ color: 'white', textAlign: 'center' }}>
          Mobilität
        </h1>
      )}
      {!searchName && (
        <HBScrollMenuCategories data={topics.data.filter((item: any) => item.id !== '1')} topic={topic} goto={goto} />
      )}
      {!videos.loading && videos.data.length === 0 && <div className="hb-no-items">Keine videos</div>}
      {videos.data.length > 0 && (
        <div className={`hb-card ${styles.contentWrapper}`}>
          {!searchName && topic === 'all' && (
            <>
              <div className={styles.header}>
                <div className={`hb-card-header ${styles.contentTitle}`}>Unsere Trainer</div>
                {trainers.data.length > 10 && (
                  <div className={styles.allTrainers} onClick={() => history.push('mobility/all-trainers')}>
                    alle Trainer
                  </div>
                )}
              </div>

              <div className={`trainer ${styles.contentTrainer}`}>
                <ScrollMenu
                  {...topicsScrollSetting}
                  data={trainers.data.slice(0, 10).map((trainer: any) => (
                    <Trainer {...trainer} key={trainer.id} fullWidth={false} className={styles.item} mobility />
                  ))}
                  menuClass={`menu-scroll ${styles.menuScroll}`}
                />
              </div>
            </>
          )}

          {!searchName && <div className={`hb-card-header ${styles.contentTitle}`}>Ihre Videos</div>}
          <div className={`row ${styles.listVideos}`}>
            {videos.data.map((video: any, index) => (
              <MobilityVideo
                className="MobilityView-video"
                setVideos={setVideos}
                {...video}
                index={index}
                key={video.id}
                setLibrary={setLibrary}
              />
            ))}
          </div>
        </div>
      )}
      {videos.page !== 0 && videos.loading && <Frame size="large" render={loadingSmall} />}
      <Waypoint onEnter={loadMoreVideos} />
      {videos.full && (
        <div className="text-center mb-2">
          <HBButton onClick={() => goto(nextTopic.id)} style={{ padding: '10px 20px' }}>
            Nächstes Thema: {nextTopic.name}
          </HBButton>
        </div>
      )}
    </>
  );
};

export default MobilityViews;
