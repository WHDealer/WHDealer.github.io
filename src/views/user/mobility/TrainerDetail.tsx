import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { HBButtonSmall } from '../../../hbBaseClass';
import styles from './TrainerDetail.module.scss';
import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react';
import VideoPlayer from '../../../components/videoPlayer/VideoPlayer';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useDispatch } from 'react-redux';
import Frame from './Frame';
import { loadingSmall } from '../../../extensions';
import { Waypoint } from 'react-waypoint';
import config from '../../../config';
import MobilityVideo from './MobilityVideo';
import { intToString } from '../../../utils';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const TrainerDetail: React.FC<RouteComponentProps> = (props: any) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));
  let param: any = props.match.params;
  const trainerId = param.id;
  console.log('wer');
  const query = new URLSearchParams(props.location.search);
  //const videoId: any = query.get('video');
  const startTime = Math.max(Number(query.get('time')) || 0, 0);
  const history = useHistory();
  const [video, setVideo] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);
  //const [relatedVideos, setRelatedVideos] = useState<any>({ data: [], loading: true });
  const [trainer, setTrainer] = useState<any>(null);
  const [follow, setFollow] = useState<any>(false);
  const [videos, setVideos] = useState<any>({
    data: [],
    loading: true,
    total_videos: 0,
    full: false,
    page: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 12;

  const getTrainerById = (id: any) => {
    setIsLoading(true);
    callApi(
      {
        method: 'get',
        api: config.rest.trainerById(id),
        loading: !video,
      },
      (response: any) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setTrainer(data);
          setFollow(data.follow);
          setIsLoading(false);
        }
      },
    );
  };

  const followAction = () => {
    setFollow((follow: any) => !follow);
    callApi(
      {
        method: !follow ? 'post' : 'delete',
        api: !follow ? config.rest.followTrainer(trainerId) : config.rest.unFollowTrainer(trainerId),
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
        }
      },
    );
  };

  const getVideosByTrainer = (page: number) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getVideoByTrainer(trainerId, page, pageSize),
        loading: page === 1,
      },
      (response: any) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setVideos((videos: any) => {
            return {
              data: page === 1 ? data.videos : [...videos.data, ...data.videos],
              full: data.videos.length < pageSize,
              loading: false,
              page: page,
              total_videos: data.total_videos,
            };
          });
        }
      },
    );
  };

  useEffect(() => {
    getTrainerById(trainerId);
    getVideosByTrainer(1);
  }, [trainerId]);

  const loadMoreTrainers = () => {
    if (videos.loading || videos.full) return;
    setVideos({ ...videos, loading: true });
    getVideosByTrainer(videos.page + 1);
  };

  console.log('Quy', intToString(2123));

  const videoParams = video
    ? {
        setPlayer: setPlayer,
        autoplay: true,
        sources: [
          {
            src: video?.link_hls,
            type: 'application/x-mpegURL',
          },
        ],
        poster: video?.thumbnail,
        //setRelatedVideos: setRelatedVideos,
        startTime,
        showQuality: true,
      }
    : {};

  const renderVideo = (
    <>
      <div className="hb-video mb-2">
        <VideoPlayer className={styles.videoWrapper} {...videoParams} />
      </div>
      {!!trainer?.description && (
        <div className={styles.videoPcDesc}>
          <div className={`hb-video-description-title ${styles.descriptionTitle}`}>Beschreibung</div>
          <div className={`hb-video-description-content ${styles.descriptionContent}`}>{trainer?.description}</div>
        </div>
      )}
    </>
  );

  const renderListVideos = (
    <>
      <div className={styles.videosAmount}>
        {videos?.total_videos < 2 ? videos?.total_videos + ' ' + 'Video' : videos?.total_videos + ' ' + 'Videos'}
      </div>
      <CRow>
        {videos.data.map((trainerVideo: any, index: number) => (
          <MobilityVideo
            {...trainerVideo}
            className="MobilityView-video"
            isDetail
            key={trainerVideo.id}
            index={index}
            setVideos={setVideos}
          />
        ))}
      </CRow>
    </>
  );

  return (
    <>
      <div className="hb-mx-20">
        <div className="d-flex justify-content-between hb-my-28">
          <HBButtonSmall onClick={() => history.goBack()}>
            <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
          </HBButtonSmall>
        </div>
      </div>
      <div className={styles.trainerDetail}>
        <CRow className={styles.trainerDetailWrapper}>
          <CCol md={8} xl={8}>
            {renderVideo}
            {videos.page !== 0 && videos.loading && <Frame size="large" render={loadingSmall} />}
          </CCol>
          <CCol md={4} xl={4}>
            <CCard className={styles.card}>
              <CCardBody className={styles.cardBody}>
                <div className={styles.avatar} style={{ backgroundImage: `url("${trainer?.avatar}")` }}></div>
                <div className={styles.userName}>
                  {!isLoading && (
                    <>
                      <p>
                        {trainer?.first_name.length < 13
                          ? trainer?.first_name
                          : (trainer?.first_name || '').slice(0, 10) + '...'}
                      </p>
                      <p>
                        {trainer?.last_name.length < 13
                          ? trainer?.last_name
                          : (trainer?.last_name || '').slice(0, 10) + '...'}
                      </p>
                    </>
                  )}
                </div>
              </CCardBody>
              <CCardFooter className={styles.footer}>
                <div className={styles.wrapperLeft}>
                  {!isLoading && (
                    <>
                      <div className={styles.views}>
                        <i className="hb-icon-eye" style={{ fontSize: 20, color: 'var(--violet-80)' }} />
                        <Tippy interactive={true} content={trainer?.amount_views}>
                          <span>{intToString(trainer?.amount_views)}</span>
                        </Tippy>
                      </div>

                      <div className={styles.videos}>
                        {trainer?.amount_videos < 2
                          ? trainer?.amount_videos + ' ' + 'Video'
                          : (trainer?.amount_videos || 0) + ' ' + 'Videos'}
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.icon} onClick={followAction}>
                  <i
                    className={`${follow ? 'hb-icon-heart-s' : 'hb-icon-heart-r'}`}
                    style={{ fontSize: 20, color: 'var(--violet-80)', cursor: 'pointer' }}
                  />
                </div>
              </CCardFooter>
            </CCard>
            {!!trainer?.description && (
              <div className={styles.videoSmDesc}>
                <div className={`hb-video-description-title ${styles.descriptionTitle}`}>Beschreibung</div>
                <div className={`hb-video-description-content ${styles.descriptionContent}`}>
                  {trainer?.description}
                </div>
              </div>
            )}
          </CCol>
        </CRow>
        <CRow className={styles.listVideosWrapper}>
          <CCol md={8} xl={8}>
            {renderListVideos}
            <Waypoint onEnter={loadMoreTrainers} />
          </CCol>
        </CRow>
      </div>
    </>
  );
};

export default TrainerDetail;
