import React, { useEffect, useState } from 'react';
import { CModal, CModalHeader, CModalBody } from '@coreui/react';
import { Waypoint } from 'react-waypoint';
import { SUCCESS } from '../../../store/callApi/actions';
import { Frame } from '../../../components';
import { defaultAvatar, loadingSmall } from '../../../extensions';

interface Props {
  show: boolean;
  handleClose: () => void;
  callApi: any;
  id: string;
  trainerName: string;
}

const pageSize = 12;

const ModalTrainerFollowers: React.FC<Props> = (props) => {
  const { show, handleClose, callApi, id, trainerName } = props;

  const [followers, setFollowers] = useState<{
    data: { id: string; first_name: string; last_name: string; email: string; avatar: string }[];
    loading: boolean;
    full: boolean;
    page: number;
    total: number;
  }>({ data: [], loading: true, full: false, page: 0, total: 0 });

  const getAllFollowers = (page: number) => {
    callApi(
      {
        method: 'get',
        api: `/api/v1/admin/trainers/${id}/followers?page_size=${pageSize}&page=${page}`,
      },
      ({ data, status }: any) => {
        if (status === SUCCESS) {
          setFollowers((followers: any) => {
            return {
              data: page === 2 ? data.followers : [...followers.data, ...data.followers],
              full: data.followers.length < pageSize,
              loading: false,
              page: page,
              total: data.total,
            };
          });
        }
      },
    );
  };

  const loadMoreFollowers = () => {
    if (followers.loading || followers.full) return;
    setFollowers({ ...followers, loading: true });
    getAllFollowers(followers.page + 1);
  };

  useEffect(() => {
    if (!show) return;

    setFollowers({ ...followers, data: [], loading: true });
    getAllFollowers(1);
  }, [show]);

  return (
    <CModal size="lg" centered show={show} onClose={handleClose} closeOnBackdrop={false}>
      <CModalHeader closeButton>Followers Of {trainerName}</CModalHeader>
      <CModalBody>
        <div style={{ overflowY: 'auto', maxHeight: '80vh', overflowX: 'hidden' }}>
          {!followers.loading && followers.data.length === 0 && <div className="hb-no-items">Keine artikel</div>}
          {followers.data.length > 0 && (
            <>
              <div className="hb-card-header px-3" style={{ marginBottom: 24, fontSize: 17 }}>
                {followers.total} Follower{followers.total > 1 ? 's' : ''}
              </div>
              <div className="row">
                {followers.data.map((follower) => (
                  <div className="col-md-6 d-flex align-items-center pb-4" key={follower.id}>
                    <div className="px-3">
                      <img
                        src={follower.avatar || defaultAvatar}
                        style={{ width: 60, height: 60, borderRadius: '50%' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 16 }}>{follower.first_name + ' ' + follower.last_name}</div>
                      <div>{follower.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {followers.loading && <Frame size="lg" render={loadingSmall} />}
          <Waypoint onEnter={loadMoreFollowers} />
          <div style={{ height: 20 }}></div>
        </div>
      </CModalBody>
    </CModal>
  );
};

export default ModalTrainerFollowers;
