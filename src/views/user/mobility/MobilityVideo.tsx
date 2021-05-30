import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useDispatch } from 'react-redux';
import { defaultTrainer, videoNoThumbnail } from '../../../extensions';

interface Props {
  index: number;
  id: string;
  thumbnail: string;
  created_date: number;
  title: string;
  viewed_amount: number;
  setVideos: (videos: any) => void;
  is_saved?: boolean;
  screenSaved?: boolean;
  categories: { id: string; name: string }[];
  isRelated?: boolean;
  isDetail?: boolean;
  category_name?: string;
  trainer_avatar: string;
  trainer_id: string;
  className?: string;
  setLibrary?: any;
}

const MobilityVideo: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const {
    index,
    id,
    thumbnail,
    title,
    viewed_amount,
    setVideos,
    is_saved,
    screenSaved,
    isRelated,
    isDetail,
    category_name,
    trainer_avatar,
    trainer_id,
    className,
    setLibrary,
  } = props;

  const history = useHistory();

  const gotoTrainer = (e: any) => {
    e.preventDefault();
    if (!trainer_id) return;
    history.push(`/mobility/trainer-detail/${trainer_id}`);
  };

  const saveAction = (e: any) => {
    e.preventDefault();
    if (!screenSaved)
      setVideos((videos: any) => {
        let newVideos = [...videos.data];
        newVideos[index].is_saved = !is_saved;
        return { ...videos, data: newVideos };
      });
    else
      setVideos((videos: any) => {
        let newVideos = videos.data.filter((newVideo: any) => newVideo.id !== id);
        return { ...videos, data: newVideos };
      });

    setLibrary &&
      setLibrary((library: any) => {
        return { ...library, is_save_number: library.is_save_number + (is_saved ? -1 : 1) };
      });

    callApi(
      {
        method: !is_saved ? 'post' : 'put',
        api: !is_saved ? config.rest.saveVideo(id) : config.rest.unsaveVideo(id),
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
        }
      },
    );
  };

  return (
    <div
      className={`${
        isRelated ? 'hb-card-item' : isDetail ? 'col-md-6 hb-card-item' : 'col-lg-4 col-md-6 hb-card-item'
      } ${className}`}
      style={{ marginBottom: isRelated ? 0 : 18, marginTop: isRelated ? 16 : 0 }}
    >
      <Link to={`/mobility/watch?video=${id}`}>
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            display: 'block',
            borderRadius: '32px 32px 0 0',
            height: 182,
            backgroundImage: `url("${thumbnail || videoNoThumbnail}")`,
            backgroundSize: 'cover',
          }}
        />
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            marginBottom: 10,
            borderRadius: '0 0 30px 30px',
            border: isRelated ? '1px solid var(--petrol-5)' : 'none',
          }}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div
                onClick={gotoTrainer}
                style={{
                  backgroundImage: `url("${trainer_avatar || defaultTrainer}")`,
                  cursor: trainer_id ? 'pointer' : 'default',
                }}
                className="hb-card-avatar"
              />
              <div className="hb-card-views-wrapper">
                <i className="hb-icon-eye" style={{ color: 'var(--violet-80)', fontSize: 22, marginRight: 7 }} />
                <div>{viewed_amount}</div>
              </div>
            </div>
            <div className="hb-save" onClick={saveAction}>
              <i className={`${is_saved ? 'hb-icon-heart-s' : 'hb-icon-heart-r'}`} />
            </div>
          </div>
          <div className="hb-card-title video">{title}</div>
          <div className="d-flex" style={{ marginTop: 10 }}>
            <div className="hb-card-hashtag">
              {category_name === 'Non category' ? <span style={{ margin: '0 20px' }}>-</span> : category_name}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MobilityVideo;
