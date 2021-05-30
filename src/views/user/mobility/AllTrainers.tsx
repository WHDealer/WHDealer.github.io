import { CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import config from '../../../config';
import { loadingSmall } from '../../../extensions';
import { HBButtonSmall } from '../../../hbBaseClass';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import styles from './AllTrainers.module.scss';
import Frame from './Frame';
import Trainer from './Trainer';

const pageSize = 12;

const AllTrainers: React.FC<RouteComponentProps> = () => {
  const location = useLocation();
  let params: any = location.search;
  const query = new URLSearchParams(params);
  const isMine = query.get('is_mine') || '';
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const history = useHistory();
  const [trainers, setTrainers] = useState({ data: [], loading: true, full: false, page: 0, amount_trainers: 0 });

  // function call API get all trainers
  const getAllTrainers = (page: number) => {
    // call API get all trainers
    callApi(
      {
        method: 'get',
        // isMine(param router of my trainer), check router if router has param then call API with method is get my trainer else call API get all trainers
        api: !isMine ? config.rest.getAllTrainers(page, pageSize) : config.rest.getMyTrainers(page, pageSize),
        loading: page === 1,
      },
      (response) => {
        const { data, status } = response;
        // call API SUCCESS
        if (status === SUCCESS) {
          // Fill data to object trainer
          setTrainers((trainers: any) => {
            return {
              data: page === 1 ? data.trainers : [...trainers.data, ...data.trainers],
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

  // function follow or unfollow trainer
  const followAction = (trainerId: number, follow: any) => {
    setTrainers((trainers: any) => {
      let newTrainers = [...trainers.data];
      const index = newTrainers.findIndex((item: any) => item.id === trainerId);
      newTrainers[index].followed = !newTrainers[index].followed;
      return { ...trainers, data: newTrainers };
    });
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

  useEffect(() => {
    getAllTrainers(1);
    // eslint-disable-next-line
  }, []);

  const loadMoreTrainers = () => {
    if (trainers.loading || trainers.full) return;
    setTrainers({ ...trainers, loading: true });
    getAllTrainers(trainers.page + 1);
  };

  return (
    <>
      <div className="hb-mx-20">
        <div className="d-flex justify-content-between hb-my-28">
          <HBButtonSmall onClick={() => history.goBack()}>
            <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
          </HBButtonSmall>
          {!trainers.loading && (
            <div className={styles.trainerAmount}>
              {trainers?.amount_trainers} {`Trainer${trainers?.amount_trainers < 2 ? '' : 's'}`}
            </div>
          )}
        </div>
        <div className={styles.title}>{!isMine ? 'Alle Trainer' : 'Ihre Trainer'}</div>
      </div>
      {trainers.data.length > 0 && (
        <div className="hb-card">
          <CRow className={styles.trainerWrapper}>
            {trainers.data.map((trainer: any) => (
              <Trainer
                {...trainer}
                key={trainer.id}
                fullWidth
                followOrUnFollow={() => followAction(trainer.id, trainer.followed)}
                mobility={isMine && true}
              />
            ))}
          </CRow>
        </div>
      )}
      {trainers.page !== 0 && trainers.loading && <Frame size="large" render={loadingSmall} />}
      <Waypoint onEnter={loadMoreTrainers} />
    </>
  );
};

export default AllTrainers;
