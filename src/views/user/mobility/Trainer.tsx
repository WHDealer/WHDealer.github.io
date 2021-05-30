import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Trainer.module.scss';

interface Props {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  amount_videos: any;
  followed: boolean;
  fullWidth: boolean;
  className?: string;
  followOrUnFollow: (trainerId: number, followed: any) => void;
  mobility: boolean;
}

const Trainer: React.FC<Props> = (props: any) => {
  const {
    id,
    avatar,
    first_name,
    last_name,
    amount_videos,
    followed,
    fullWidth,
    className,
    followOrUnFollow,
    mobility,
  } = props;

  const history = useHistory();
  const summaryName = (name: any) => {
    if (name.length > 13) return name.slice(0, 10) + '...';
    return name;
  };

  return (
    <div className={`${fullWidth ? 'col-lg-3 col-md-3 hb-card-item' : className}`}>
      <div className={styles.trainerItem}>
        <div className={styles.trainerWrapper}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url("${avatar}")` }}
            onClick={() => history.push(`/mobility/trainer-detail/${id}`)}
          ></div>
          <div className={styles.name} onClick={() => history.push(`/mobility/trainer-detail/${id}`)}>
            {summaryName(first_name)}
          </div>
          <div className={styles.lastName} onClick={() => history.push(`/mobility/trainer-detail/${id}`)}>
            {summaryName(last_name)}
          </div>
          <div className={styles.videosAmount} onClick={() => history.push(`/mobility/trainer-detail/${id}`)}>
            {amount_videos < 2 ? amount_videos + ' ' + 'video' : amount_videos + ' ' + 'videos'}
          </div>
          {mobility && (<div className={styles.icon} onClick={() => (mobility ? followOrUnFollow(id, followed) : {})}>
            <i
              className={`${followed ? 'hb-icon-heart-s' : 'hb-icon-heart-r'}`}
              style={{ fontSize: 20, color: 'var(--violet-80)' }}
            />
          </div>
            )}
          {/* )} */}
        </div>
      </div>
    </div>
  );
};
export default React.memo(Trainer);
