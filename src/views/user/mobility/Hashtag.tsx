import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { Waypoint } from 'react-waypoint';
import { defaultTrainer, loadingSmall } from '../../../extensions';
import Frame from './Frame';
import { HBButtonSmall } from '../../../hbBaseClass';
import styles from './Hashtag.module.scss';

const Hashtag: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const pageSize = 10;
  const [videos, setVideos] = useState<any>({ data: [], loading: true, full: false, page: 0, amount_videos: 0 });
  const hashtag: any = props.match?.params;
  const history = useHistory();

  const getAllVideos = (hashtag: any, page: any) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getVideosByHashTag(hashtag, page, pageSize),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setVideos({
            data: page === 1 ? data.videos : [...videos.data, ...data.videos],
            full: data.videos.length < pageSize,
            loading: false,
            page: page,
            amount_videos: data.amount_videos,
          });
        }
      },
    );
  };

  const saveAction = (id: any, isSaved: any) => {
    setVideos((videos: any) => {
      let newVideos = [...videos.data];
      let index = newVideos.findIndex((item: any) => item.id === id);
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

  const loadMoreVideos = () => {
    if (videos.loading || videos.full) return;
    setVideos({ ...videos, loading: true });
    getAllVideos(hashtag?.keyword, videos.page + 1);
  };

  useEffect(() => {
    getAllVideos(hashtag?.keyword, 1);
    window.scrollTo(0, 0);
  }, []);

  videos.loading && <div />;

  return (
    <div className="wide">
      <div className={styles.mobilitySaved}>
        <div className="hb-mx-20">
          <div className="d-flex justify-content-between hb-my-28">
            <HBButtonSmall color="nightblue" onClick={() => history.goBack()}>
              <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
            </HBButtonSmall>
          </div>
          <h3 className={styles.title}>{`#${hashtag?.keyword}`}</h3>
        </div>
        <div className="hb-card">
          <div className="hb-card-header">
            {videos.loading ? (
              <div />
            ) : (
              <div className={styles.hashtagInformation}>
                {videos.amount_videos < 2 ? `${videos.amount_videos} video` : `${videos.amount_videos} videos`}
              </div>
            )}
          </div>
          {videos.data.length === 0 && !videos.loading && <div className="no-articles">No videos</div>}
          <div className="row ">
            {videos.data.map((video: any) => (
              <div className="col-lg-6 col-md-6 hb-card-item">
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 32,
                    height: 181,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  key={video?.id}
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
                          onClick={() =>
                            video?.trainer_id ? history.push(`/mobility/trainer-detail/${video?.trainer_id}`) : {}
                          }
                        ></div>
                        <div className={styles.amountView}>
                          <i className={'hb-icon-eye'} />
                          {video?.viewed_amount}
                        </div>
                      </div>
                      <div className="hb-save" onClick={() => saveAction(video.id, video.is_saved)}>
                        <i className={`${video.is_saved ? 'hb-icon-heart-s' : 'hb-icon-heart-r'}`} />
                      </div>
                    </div>

                    <div className={styles.content} onClick={() => history.push(`/mobility/watch?video=${video?.id}`)}>
                      {video?.title.length < 50 ? video?.title : video?.title.slice(0, 47) + '...'}
                    </div>
                    <div
                      className="d-flex"
                      onClick={() => history.push(`/mobility/watch?video=${video?.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={`hb-card-hashtag`}>{video.category_name}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {videos.page !== 0 && videos.loading && <Frame size="large" render={loadingSmall} />}
        <Waypoint onEnter={loadMoreVideos} />
      </div>
    </div>
  );
};

export default Hashtag;
