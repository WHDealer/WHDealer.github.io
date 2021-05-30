import React, { useEffect, useState } from 'react';
import { CCol, CContainer, CHeader, CRow } from '@coreui/react';
import { RouteComponentProps, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import Search from '../../../components/search/Search';
import FriendItem from './FriendItem';
import { ConfirmPopup } from '../../../components';

const SearchFriend: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [friend, setFriend] = useState<any>({ data: {}, loading: true });
  const [searchName, setSearchName] = useState('');
  const [popupCancel, setPopupCancel] = useState({ show: false });
  const history = useHistory();
  const [popupRequestCancel, setPopupRequestCancel] = useState({ show: false });

  const searchFriend = (searchName: any) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getUserSearchName(searchName),
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

  const unFriend = (userId: any, page: any) => {
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
          history.push('/consulting/add-friend');
        }
      },
    );
  };

  const handleCancel = () => {
    setPopupCancel({ show: false });
    unFriend(friend.data.id, 1);
  };

  const handleCancelRequest = () => {
    console.log('123');
    setPopupRequestCancel({ show: false });
    changeStatus(friend.data.id, friend.data.type);
  };

  const searchParams: any = {
    className: 'header-topic--wrapper__search--selection__world',
    searchName,
    setSearchName,
    searchEmpty: true,
    callbackSearch: (searchValue: string) => searchFriend(searchValue),
    timeoutSearch: 3000,
    inputStyle: { width: 400 },
  };

  return (
    <div>
      <CContainer>
        <div className="add-friend-page-wrapper">
          <CHeader
            style={{ padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}
          >
            <h4>Search Friend</h4>
            <div style={{ width: 650 }}>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  paddingLeft: 0,
                  justifyContent: 'space-between',
                  marginBottom: 0,
                  alignItems: 'center',
                }}
              >
                <li>
                  <Search {...searchParams} className="add-friend__search" placeholder="Search friend" />
                </li>
                <li>
                  <Link to="/consulting/add-friend">List Friend</Link>
                </li>
                <li>
                  <Link to="/consulting/friend-request">Friend Request</Link>
                </li>
              </ul>
            </div>
          </CHeader>
          <div className="add-friend-main-page-body">
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
                  friend.data.type === 'cancel'
                    ? setPopupRequestCancel({ show: false })
                    : setPopupCancel({ show: false })
                }
                rightButtonOnPress={() => (friend.data.type === 'cancel' ? handleCancelRequest() : handleCancel())}
              />
              {Object.keys(friend.data).length === 0 ? (
                <div style={{ textAlign: 'center', width: '100%' }}>{searchName ? 'No result' : 'Search by email'}</div>
              ) : (
                <CCol md={6} style={{ marginTop: 15 }}>
                  <FriendItem
                    first_name={friend.data.first_name}
                    last_name={friend.data.last_name}
                    img={friend.data.avatar}
                    id={friend.data.id}
                    changeStatus={changeStatus}
                    status={friend.data.type}
                    search={true}
                    setPopUpCancel={setPopupCancel}
                    setPopupRequestCancel={setPopupRequestCancel}
                  />
                </CCol>
              )}
            </CRow>
          </div>
        </div>
      </CContainer>
    </div>
  );
};
export default SearchFriend;
