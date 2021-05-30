import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { CButton, CCol, CContainer, CImg, CRow } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { ConfirmPopup } from '../../../components';

const InformationFriendPage: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const params: any = props.match.params;
  const id = params.userName;
  const history = useHistory();

  const [friend, setFriend] = useState<any>({ data: {}, loading: true });
  const [popupCancel, setPopupCancel] = useState({ show: false });
  const [popupRequestCancel, setPopupRequestCancel] = useState({ show: false });

  const getFriendInformation = (userId: any) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getUserInformation(userId),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setFriend({
            data: { ...data },
            loading: false,
          });
        }
      },
    );
  };

  useEffect(() => {
    getFriendInformation(id);
  }, []);

  const changeStatus = (userId: any, type: any) => {
    callApi(
      {
        method: type === null ? 'post' : type === 'confirm' ? 'put' : 'delete',
        api:
          type === null
            ? config.rest.addFriend(userId)
            : type === 'confirm'
            ? config.rest.changeStatusFriend(userId)
            : config.rest.deleteFriend(userId),
        loading: true,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          setFriend((friend: any) => {
            const key: any = { confirm: 'friend', cancel: null, friend: null, null: 'cancel' };
            let newData = { ...friend };
            newData.data.type = key[type];
            return newData;
          });
        }
      },
    );
  };

  const unFriend = (userId: any) => {
    callApi(
      {
        method: 'delete',
        api: config.rest.deleteFriend(userId),
        loading: true,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          setFriend((friends: any) => ({
            ...friends,
          }));
        }
      },
    );
  };

  const handleCancel = () => {
    console.log('12312');
    setPopupCancel({ show: false });
    unFriend(friend.data.id);
  };

  const handleCancelRequest = () => {
    console.log('123');
    setPopupRequestCancel({ show: false });
    changeStatus(friend.data.id, friend.data.type);
  };

  return (
    <div className="information-friend" style={{ textAlign: 'center' }}>
      <CContainer fluid className="profile-user__container nopadding">
        <div className="profile-user--top">
          <div style={{ width: 100 + '%', textAlign: 'left' }}>
            <CButton
              color="primary"
              variant="ghost"
              onClick={() => {
                history.push('/consulting/add-friend');
              }}
            >
              <i className="fas fa-chevron-left"></i> Back friend list page
            </CButton>
          </div>

          <div className="avatar-user">
            <CImg
              className="avatar-user--img"
              src={friend.data.avatar || 'https://i.stack.imgur.com/l60Hf.png'}
              alt="Avatar"
              width="128"
              height="128"
            />
          </div>
        </div>
        <div className="profile-user--bottom">
          <CRow>
            <ConfirmPopup
              isVisible={friend.data.type === 'cancel' ? popupRequestCancel.show : popupCancel.show}
              title="Cancel"
              content={
                friend.data.type === 'cancel'
                  ? 'Are you sure you want to cancel request?'
                  : 'Are you sure you want to unfriend?'
              }
              leftButtonText="No"
              rightButtonText="Yes"
              leftButtonOnPress={() =>
                friend.data.type === 'cancel' ? setPopupRequestCancel({ show: false }) : setPopupCancel({ show: false })
              }
              rightButtonOnPress={() => (friend.data.type === 'cancel' ? handleCancelRequest() : handleCancel())}
            />

            {Object.keys(friend.data).length === 0 ? (
              <div style={{ textAlign: 'center', width: 100 + '%' }}> Search Friend </div>
            ) : (
              <CCol md={12}>
                <h3 className="user-name">
                  {friend.data.first_name} {friend.data.last_name}
                </h3>

                <div className="email">
                  <p className="email"> {friend.data.email} </p>
                </div>

                <div className="bio">
                  <p className="bio-content"> {friend.data.bio} </p>
                </div>

                <div className="btn_call">
                  {friend.data.type === 'friend' ? (
                    <div>
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => {
                          setPopupCancel({ show: true });
                        }}
                      >
                        Unfriend
                      </CButton>
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => {
                          console.log('123');
                          // history.push('/consulting/add-friend');
                        }}
                      >
                        <i className="fas fa-phone"></i> Call
                      </CButton>
                    </div>
                  ) : friend.data.type === 'confirm' ? (
                    <div style={{ width: 100 + '%', display: 'flex', justifyContent: 'center' }}>
                      <CButton color="primary" variant="outline" onClick={() => changeStatus(friend.data.id, 'cancel')}>
                        Delete
                      </CButton>
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => {
                          changeStatus(friend.data.id, friend.data.type);
                        }}
                      >
                        Confirm
                      </CButton>
                    </div>
                  ) : friend.data.type === 'cancel' ? (
                    <CButton color="primary" variant="outline" onClick={() => setPopupRequestCancel({ show: true })}>
                      Cancel request
                    </CButton>
                  ) : (
                    <CButton
                      color="primary"
                      variant="outline"
                      onClick={() => changeStatus(friend.data.id, friend.data.type)}
                    >
                      Add friend
                    </CButton>
                  )}
                </div>
              </CCol>
            )}
          </CRow>
        </div>
      </CContainer>
    </div>
  );
};

export default InformationFriendPage;
