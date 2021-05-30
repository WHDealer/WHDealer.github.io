import ReactDOM from 'react-dom';
import config from '../../../config';
import { includes } from '../../../utils';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import React, { useEffect, useState, useRef } from 'react';
import VideoPlayer from '../../../components/videoPlayer/VideoPlayer';
// import ShowMoreText from '../../../components/showMoreText/ShowMoreText';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Frame from './Frame';
import Comment from './Comment';
import CommentInput from './CommentInput';
import PopupDeleteComment from './PopupDeleteComment';
import { defaultTrainer, loadingSmall } from '../../../extensions';
import { Waypoint } from 'react-waypoint';
import { useDispatch } from 'react-redux';
import Workbooks from './Workbooks';
import { HBButtonSmall, HBMenuPopup } from '../../../hbBaseClass';
import WorkbookItem from './WorkbookItem';
import MobilityVideo from './MobilityVideo';
import ContainterEllipse from '../containers/ContainerEllipse';
import QNA from './QNA';
import styles from './MobilityDetail.module.scss';

interface Props {
  location: {
    search?: string;
  };
}

const MobilityDetail: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));

  const query = new URLSearchParams(props?.location?.search);

  const location = useLocation();

  const videoId: any = query.get('video');
  const [startTime, setStartTime] = useState(Math.max(Number(query.get('time')) || 0, 0));
  const [qna, setQna] = useState(query.get('qna') || false);

  const autoplay = query.get('autoplay');
  const history = useHistory();
  const pageComments = useRef<number>(1);
  const pageRelatedVideos = useRef<number>(1);
  const pageSize = 10;

  const [video, setVideo] = useState<any>(null);
  const [like, setLike] = useState({ isLiked: false, count: 0 });
  const [isSaved, setIsSaved] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState<any>({ data: [], loading: true });
  const [comments, setComments] = useState<any>({ data: [], loading: true, total: 0, full: false });
  const [player, setPlayer] = useState<any>(null);
  const [popupDelete, setPopupDelete] = useState<any>({
    deleteComment: null,
    show: false,
    isReply: false,
  });
  const [menuPopup, setMenuPopup] = useState<any>({
    show: false,
    top: 0,
    left: 0,
    width: 0,
    items: [],
  });

  const getVideoById = (videoId: string) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getVideoById(videoId),
        loading: !video,
      },
      (response: any) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setVideo(data.video);
          setLike({ isLiked: data.video.is_liked, count: data.video.liked_amount });
          setIsSaved(data.video.is_saved);
          setComments((comments: any) => {
            return { ...comments, total: data.video.commented_amount };
          });
        }
      },
    );
  };

  const getRelatedVideos = (videoId: string, page: number) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getRelatedVideos(videoId, pageSize, page),
      },
      (response: any) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setRelatedVideos({
            data: data.videos,
            loading: false,
          });
        }
      },
    );
  };

  const getComments = (page: number) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getComments(videoId, page),
      },
      (response: any) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setComments((comments: any) => {
            const commentsData = comments.data;
            return {
              ...comments,
              data: [...commentsData, ...data.comments.filter((item: any) => !includes(commentsData, item))],
              loading: false,
              full: data.comments.length < pageSize,
            };
          });
        } else {
          setComments((comments: any) => {
            return {
              ...comments,
              loading: false,
            };
          });
        }
      },
    );
  };

  const likeAction = (videoId: string) => {
    callApi(
      {
        method: !like.isLiked ? 'post' : 'put',
        api: !like.isLiked ? config.rest.likeVideo(videoId) : config.rest.unlikeVideo(videoId),
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
          setLike((like) => {
            return { isLiked: !like.isLiked, count: like.count + (like.isLiked ? -1 : 1) };
          });
        }
      },
    );
  };

  const saveAction = () => {
    setIsSaved((isSaved) => !isSaved);

    callApi(
      {
        method: !isSaved ? 'post' : 'put',
        api: !isSaved ? config.rest.saveVideo(videoId) : config.rest.unsaveVideo(videoId),
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
        }
      },
    );
  };

  const loadMoreComment = () => {
    if (comments.loading) return;
    if (comments.total <= comments.data.length) return;
    if (comments.full) return;
    setComments({ ...comments, loading: true });
    pageComments.current += 1;
    getComments(pageComments.current);
  };

  useEffect(() => {
    const reload = () => {
      if (video && player) player.reset();
      window.scrollTo(0, 0);
      setComments({ ...comments, data: [], loading: true });
      getVideoById(videoId);
      getComments(pageComments.current);
      getRelatedVideos(videoId, pageRelatedVideos.current);
      setMenuPopup({ ...menuPopup, show: false });
    };

    if (!videoId) history.push('/mobility');
    else reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  useEffect(() => {
    if (player && video.link_hls) player.src(video.link_hls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuPopup]);

  /**
   * Calculate popup position (use for responsive display)
   *
   * @param bound Element bounding client
   *
   * @return Object
   */
  function calculatePopupPosition(bound: any) {
    const { clientWidth: windowWidth } = document.documentElement;
    const left = windowWidth <= 860 ? bound.left - 131 : bound.left + window.scrollX;
    let top = bound.top + window.scrollY - 20;
    top = windowWidth <= 860 ? top + 50 : top;

    return { top, left: left + 30 };
  }

  /**
   * Handle resize window
   */
  function handleResizeWindow() {
    const { targetEle } = menuPopup;
    const eleTargetDOM: any = ReactDOM.findDOMNode(targetEle);
    const bound = eleTargetDOM?.getBoundingClientRect();

    if (!bound) return;
    const popupPosition = calculatePopupPosition(bound);

    setMenuPopup({ ...menuPopup, ...popupPosition });
  }

  const videoParams = video
    ? {
        setPlayer: setPlayer,
        autoplay: autoplay !== '0',
        sources: [
          {
            src: video?.link_hls,
            type: 'application/x-mpegURL',
          },
        ],
        poster: video?.thumbnail,
        setRelatedVideos: setRelatedVideos,
        startTime,
        showQuality: true,
      }
    : {};

  const handleOpenPopup = (e: any, data: { edit: any; del: any }) => {
    const bound = e.target.getBoundingClientRect();
    const popupPosition = calculatePopupPosition(bound);

    setMenuPopup({
      targetEle: e.target,
      show: true,
      width: 141,
      items: [
        {
          id: 'edit',
          label: 'Bearbeiten',
          icon: 'edit-2',
          handle: data.edit,
        },
        {
          id: 'del',
          label: 'Löschen',
          icon: 'trash',
          handle: data.del,
        },
      ],
      ...data,
      ...popupPosition,
    });
  };

  const gotoTrainer = (e: any) => {
    e.preventDefault();
    if (!video.trainer_id) return;
    history.push(`/mobility/trainer-detail/${video.trainer_id}`);
  };

  const renderVideo = video ? (
    <>
      <div className="hb-video mb-2">
        <VideoPlayer className={styles.videoWrapper} {...videoParams} />
      </div>

      <div className="d-flex justify-content-between align-items-center hb-my-28">
        <div className="d-flex align-items-center">
          <div
            onClick={gotoTrainer}
            style={{
              backgroundImage: `url("${video.trainer_avatar || defaultTrainer}")`,
              cursor: video.trainer_id ? 'pointer' : 'default',
            }}
            className="hb-card-avatar"
          />
          <div className="hb-card-views-wrapper detail">
            <i className="hb-icon-eye" style={{ color: 'var(--violet-80)', fontSize: 22, marginRight: 7 }} />
            <div>{video?.viewed_amount}</div>
          </div>
        </div>
        <div className="hb-save" onClick={saveAction}>
          <i className={`${isSaved ? 'hb-icon-heart-s' : 'hb-icon-heart-r'}`} />
        </div>
      </div>

      <div className="hb-title-video">{video?.title}</div>

      <div className={`d-flex ${styles.tags}`}>
        {video?.tag
          ?.split?.(',')
          .filter((item: any) => item !== '')
          .map((item: string, index: number) => (
            <Link to={`/mobility/hashtag/${item}`} key={index} className="hb-card-keyword">
              {`#${item}`}
            </Link>
          ))}
      </div>

      {video?.description && (
        <>
          <div className="hb-video-description-title">Beschreibung</div>
          <div className="hb-video-description-content">
            {video.description}
            {/* <ShowMoreText lines={2} more="Show more" less="Show less" className="content-css" expanded={false}>
          {video?.description}
        </ShowMoreText> */}
          </div>
        </>
      )}

      {/* Comments */}
      <div className="hb-card-video">
        <div className="header">
          {comments.total} Kommentar{comments.total > 1 && 'e'}
        </div>
        <>
          <CommentInput videoId={video.id} setComments={setComments} />
          {comments.data.map((comment: any) => (
            <Comment
              key={comment.id}
              handleOpenPopup={handleOpenPopup}
              videoId={videoId}
              comment={comment}
              setComments={setComments}
              setPopupDelete={setPopupDelete}
            />
          ))}
        </>
        {comments.loading && <Frame size="large" render={loadingSmall} />}
        <Waypoint onEnter={loadMoreComment} />
      </div>
    </>
  ) : (
    <div className="hb-video mb-2">
      <div className={`video-wrapper ${styles.videoWrapper}`} />
    </div>
  );

  if (qna)
    return (
      <QNA
        handleClose={() => {
          setQna(false);
          history.push(location.pathname + `?video=${videoId}&autoplay=${autoplay}`);
        }}
      />
    );

  return (
    <ContainterEllipse>
      <HBMenuPopup
        {...menuPopup}
        className="userOptions"
        handleClose={() => setMenuPopup({ ...menuPopup, show: false })}
      />

      <div className="hb-mx-20">
        <div className="hb-my-28">
          <HBButtonSmall onClick={() => history.goBack()}>
            <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
          </HBButtonSmall>
        </div>
        <div className="mobility-detail">
          <PopupDeleteComment popupDelete={popupDelete} setPopupDelete={setPopupDelete} />

          <div className={`row ${styles.detailWrapperContainer}`}>
            <div className="col-md-8">{renderVideo}</div>
            <div className="col-md-4">
              {video?.documents?.length > 0 && (
                <div className="hb-card-video">
                  <Workbooks data={video.documents} />
                </div>
              )}
              <div className="hb-card-video">
                <div className="header">Häufige Fragen zum Video</div>
                <WorkbookItem
                  label="Fragen &amp; Antworten"
                  icon="comment-2-question"
                  callback={() => {
                    const current = Math.floor(player.currentTime());
                    history.push(
                      location.pathname +
                        `?video=${videoId}&qna=true&time=${current}&autoplay=${player.paused() ? '0' : '1'}`,
                    );
                    setStartTime(current);
                    setQna(true);
                    window.scrollTo(0, 0);
                  }}
                />
              </div>
              <div className={`hb-card-video ${styles.listVideosWrapper}`}>
                <div className="header">Empfohlene Videos</div>
                <div className={styles.listVideos}>
                  {relatedVideos.data.map((relatedVideo: any, index: any) => (
                    <MobilityVideo
                      setVideos={setRelatedVideos}
                      {...relatedVideo}
                      key={relatedVideo.id}
                      index={index}
                      isRelated={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainterEllipse>
  );
};

export default MobilityDetail;
