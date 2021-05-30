import React from 'react';
import { CModal, CModalHeader, CModalBody, CImg, CButton } from '@coreui/react';
import config from '../../../config';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import Frame from '../mobility/Frame';
import { loadingSmall } from '../../../extensions';

interface Props {
  type?: 'following' | 'follower';
  typeFollow: any;
  handleClose: any;
  show: any;
  location: any;
  setData: any;
  users: any;
  loadingModal: boolean;
  setUsers: any;
  // setFormValue: (params: any) => void;
}

const FollowerAndFollowing: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));

  const { typeFollow, setData, users, loadingModal, setUsers } = props;

  const followingAndDeleteUser = (index: number) => {
    const userId = users[index].id;

    callApi(
      {
        method: users[index].followed_by_viewer === false ? 'delete' : 'post',
        api:
          users[index].followed_by_viewer === false
            ? config.rest.unfollowUser(userId)
            : config.rest.postFollowingUser(userId),
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
          const newUsers = [...users];
          newUsers[index].followed_by_viewer = !newUsers[index].followed_by_viewer;

          setUsers(newUsers);
          setData((data: any) => {
            let newData = { ...data };
            newData.following += users[index].followed_by_viewer === true ? 1 : -1;
            return newData;
          });
        }
      },
    );
  };

  let render = <Frame size="medium" render={loadingSmall} />;

  if (!loadingModal) {
    render = users.map((user: any, index: number) => (
      <div className="wrapper-followerandfollowing" key={index}>
        <div className="follow">
          <div className="follow-avatar">
            <CImg className="follow-avatar--img" src={user.avatar_thumbnail} alt="AVT" height="40px" width="40px" />
          </div>
          <div className="follow-avatar--name">{`${user.first_name}${user.last_name}`}</div>
        </div>
        <div className="follow-status">
          <CButton color="primary" onClick={() => followingAndDeleteUser(index)}>
            {user.followed_by_viewer ? 'Following' : 'Follow'}
          </CButton>
        </div>
      </div>
    ));
  }

  return (
    <CModal show={props.show} onClose={() => props?.handleClose?.()} onClosed={() => props?.handleClose?.()} centered>
      <CModalHeader closeButton>{typeFollow === 'following' ? 'Following' : 'Follower'}</CModalHeader>
      <CModalBody>{render}</CModalBody>
    </CModal>
  );
};

export default FollowerAndFollowing;
