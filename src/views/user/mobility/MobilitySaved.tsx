import React, { useEffect, useState } from 'react';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import { defaultTrainer, loadingSmall } from '../../../extensions';
import Frame from './Frame';
import { HBButtonSmall, HBModalConfirm, HBSearch } from '../../../hbBaseClass';
import styles from './MobilitySaved.module.scss';
import Saly24 from '../../../assets/images/Saly-24.svg';

interface Props {
  location: { search: string };
}

const DAY = 3600 * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = MONTH * 12;

const MobilitySaved: React.FC<Props> = (props) => {
  const location = useLocation();
  let params: any = location.search;
  const query = new URLSearchParams(params);
  const isMine = query.get('history') || '';
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const history = useHistory();
  const pageSize = 12;
  const [videos, setVideos] = useState<any>({ data: [], loading: true, full: false, page: 0 });
  const [searchName, setSearchName] = useState('');
  const [isVisiblePopupClearAll, setIsVisiblePopupClearAll] = useState(false);
  // const [group, setGroup] = useState<{ label: string; arr: any[] }[]>([]);

  const getAllSavedVideos = (searchName: string, page: number) => {
    callApi(
      {
        method: 'get',
        api: !isMine
          ? config.rest.getSearchVideos('1', searchName, '', pageSize, page)
          : config.rest.getHistoryWatch(searchName, page, pageSize),
        loading: page === 1,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          const newVideos = page === 1 ? data.videos : [...videos.data, ...data.videos];
          setVideos({
            data: newVideos,
            full: data.videos.length < pageSize,
            loading: false,
            page: page,
          });
        }
      },
    );
  };

  const savedOrUnSaved = (id: any, isSaved: any) => {
    setVideos((videos: any) => {
      let newVideos = [...videos.data];
      const index = newVideos.findIndex((item: any) => item.id === id);
      newVideos[index].is_saved = !newVideos[index].is_saved;
      return { ...videos, data: newVideos };
    });
    callApi(
      {
        method: !isSaved ? 'post' : 'put',
        api: !isSaved ? config.rest.saveVideo(id) : config.rest.unsaveVideo(id),
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
        }
      },
    );
  };

  const unsaveAllMobility = () => {
    setVideos({
      data: [],
      loading: false,
    });
    callApi(
      {
        method: 'delete',
        api: !isMine ? config.rest.unsaveALLMobility() : config.rest.clearAllHistoryWatch(),
        loading: true,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          setIsVisiblePopupClearAll(false);
          setVideos({ ...videos, data: [] });
        }
      },
    );
  };

  const onCancelClearAll = () => {
    setIsVisiblePopupClearAll(false);
  };

  const removeVideoHistory = (videoId: any) => {
    let newHistoriesWatch = { ...videos };
    let arrayVideo = [...videos?.data];
    arrayVideo = arrayVideo.filter((item: any) => item?.watch_history_id !== videoId);
    newHistoriesWatch.data = arrayVideo;
    setVideos(newHistoriesWatch);

    callApi(
      {
        method: 'delete',
        api: config.rest.removeHistoryWatch(videoId),
      },
      (response: any) => {
        const { status } = response;
        console.log('response', response);
        if (status === SUCCESS) {
        }
      },
    );
  };

  useEffect(() => {
    getAllSavedVideos(searchName, 1);
    window?.scrollTo(0, 0);
  }, []);

  const loadMoreVideos = () => {
    if (videos.loading || videos.full) return;
    setVideos({ ...videos, loading: true });
    getAllSavedVideos(searchName, videos.page + 1);
  };

  const searchParams: any = {
    className: 'header-topic--wrapper__search--selection__world',
    searchName,
    setSearchName,
    searchEmpty: true,
    callbackSearch: (searchValue: string) => getAllSavedVideos(searchValue, 1),
    isNew: true,
    clearBtn: true,
    onKeyPress: (searcValue: string) => getAllSavedVideos(searcValue, 1),
    timeoutSearch: 0,
  };

  const renderItem = (video: any) => {
    return (
      <div className="col-lg-6 col-md-6 hb-card-item" key={video.id}>
        <div
          style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 32,
            height: 181,
            display: 'flex',
            alignItems: 'center',
          }}
          key={isMine ? video?.watch_history_id : video?.id}
        >
          <div>
            <div
              style={{
                overflow: 'hidden',
                display: 'block',
                borderRadius: 20,
                width: 150,
                height: 150,
                backgroundImage: `url("${video?.thumbnail}")`,
                backgroundSize: 'cover',
                marginRight: 20,
                cursor: 'pointer',
              }}
              onClick={() => history.push(`/mobility/watch?video=${video?.id}`)}
            />
          </div>
          <div
            style={{
              marginLeft: 10,
              marginRight: 28,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <div className="d-flex justify-content-between">
              <div className={`${styles.informationTrainer} d-flex justify-content-between`}>
                <div
                  style={{
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    backgroundImage: `url("${video?.trainer_avatar || defaultTrainer}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    cursor: video?.trainer_id ? 'pointer' : 'default',
                  }}
                  onClick={() => {
                    if (video?.trainer_id) history.push(`/mobility/trainer-detail/${video?.trainer_id}`);
                  }}
                ></div>
                <div className={styles.amountView}>
                  <i className={'hb-icon-eye'} />
                  {video?.viewed_amount}
                </div>
              </div>
              <div
                className={`${isMine ? styles.hbSave : 'hb-save'}`}
                onClick={() =>
                  isMine ? removeVideoHistory(video.watch_history_id) : savedOrUnSaved(video.id, video.is_saved)
                }
              >
                {isMine ? (
                  <i className={'hb-icon-cross'} />
                ) : (
                  <i className={`${video.is_saved ? 'hb-icon-heart-s' : 'hb-icon-heart-r'}`} />
                )}
              </div>
            </div>

            <div className={styles.content} onClick={() => history.push(`/mobility/watch?video=${video?.id}`)}>
              {video?.title.length > 30 ? video?.title.slice(0, 27) + '...' : video?.title}
            </div>
            <div
              className="d-flex"
              style={{ cursor: 'pointer' }}
              onClick={() => history.push(`/mobility/watch?video=${video?.id}`)}
            >
              <div className={`hb-card-hashtag`}>{video.category_name}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let group: { label: string; arr: any[]; count: number }[] = [];
  const addGroup2 = (label: string, item: any) => {
    const index = group.findIndex((item: any) => item.label === label);
    if (index === -1) group.push({ label, arr: [item], count: isMine ? 1 : item.is_saved ? 1 : 0 });
    else {
      group[index].arr.push(item);
      group[index].count += isMine ? 1 : item.is_saved ? 1 : 0;
    }
  };

  const now = new Date().getTime();

  const addGroup = (item: any) => {
    const date = new Date((item.saved_date || item.created_date) * 1000);
    const different = (now - date.getTime()) / 1000;
    if (different < DAY) addGroup2('Heute', item);
    else if (different < DAY * 2) addGroup2('1 Tag', item);
    else if (different < WEEK) addGroup2(Math.floor(different / DAY) + ' Tage', item);
    else if (different < WEEK * 2) addGroup2('1 Woche', item);
    else if (different < MONTH) addGroup2(Math.floor(different / WEEK) + ' Wochen', item);
    else if (different < MONTH * 2) addGroup2('1 Monat', item);
    else if (different < YEAR) addGroup2(Math.floor(different / MONTH) + ' Monate', item);
    else if (different < YEAR * 2) addGroup2('1 Jahr', item);
    else addGroup2(Math.floor(different / YEAR) + ' Jahre', item);
  };
  videos.data.forEach((item: any) => addGroup(item));

  return (
    <>
      <HBModalConfirm
        show={isVisiblePopupClearAll}
        handleClose={onCancelClearAll}
        title="Gesehene löschen"
        content="Sind Sie sicher, dass Sie Ihre gesehenen Videos vollständig löschen möchten?"
        up="Ja, löschen"
        upCallback={unsaveAllMobility}
        down="Abbrechen"
        downCallback={onCancelClearAll}
      />
      <div className="hb-mx-20">
        <div className="d-flex justify-content-between hb-my-28">
          <HBButtonSmall className={styles.btn} onClick={() => history.goBack()}>
            <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
          </HBButtonSmall>
          <HBButtonSmall className={styles.btn} onClick={() => setIsVisiblePopupClearAll(true)}>
            alle löschen
          </HBButtonSmall>
        </div>
        <h1 className={styles.title}>{!isMine ? ' Gespeicherte Videos' : 'Angesehene Videos'}</h1>
      </div>
      <div className={`hb-card`}>
        <div className="videos-saved--page">
          <div className="row" style={{ marginBottom: videos.loading ? 20 : 0 }}>
            <div className="col-md-12">
              <HBSearch placeholder="Videos suchen" {...searchParams} nightBlue />
            </div>
          </div>
          {group.map((item: any) => (
            <div className="levelDateWrapper" key={item.label}>
              <div className="d-flex justify-content-between">
                <div className="levelDateWrapperTitle">{item.label}</div>
                <div className="levelDateWrapperAmountVideos">
                  {item.count + ' Video' + (item.count > 2 ? 's' : '')}
                </div>
              </div>
              <div className={`row ${styles.mobilityWrapper}`}>
                {item.arr.map((video: any) => {
                  return renderItem(video);
                })}
              </div>
            </div>
          ))}

          {group.length === 0 && !videos.loading && (
            <>
              <div className={styles.image}>
                <div className={styles.imageContentWrap}>
                  <div className={styles.imageContentTitle}>{`Keine ${
                    isMine ? 'Angesehene' : 'Gespeicherten'
                  } Videos`}</div>
                  <p className={styles.imageContent}>Um Videos zu speicher, tippen Sie auf das Herz beim Video.</p>
                </div>
                <div
                  style={{
                    width: 300,
                    display: 'block',
                    height: 300,
                    backgroundImage: `url("${Saly24}")`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '20px 10px',
                  }}
                  className={styles.imagesaly}
                />
              </div>
              {videos.page !== 0 && videos.loading && <Frame size="large" render={loadingSmall} />}
              <Waypoint onEnter={loadMoreVideos} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobilitySaved;
