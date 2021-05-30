import React, { useEffect, useState } from 'react';
import { CCol, CContainer, CHeader, CRow } from '@coreui/react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import Search from '../../../components/search/Search';
import { Waypoint } from 'react-waypoint';
import { loadingSmall } from '../../../extensions';
import Frame from '../mobility/Frame';
import FriendItem from './FriendItem';

const FriendRequest: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [friends, setFriends] = useState({ data: [], loading: true, full: false, page: 0 });
  const [searchName, setSearchName] = useState('');
  const pageSize = 10;

  const getListFriendRequest = (searchName: any, page: any) => {
    // get list friend request by search name, page from backend server

    callApi(
      {
        // api method is get, url is config.rest.getListUsersConfirm, enable loading if page is 1
        method: 'get',
        api: config.rest.getListUsersConfirm(searchName, page, pageSize),
        loading: page === 1,
      },
      (response) => {
        // when call api success, get status, data of response
        const { data, status } = response;
        if (status === SUCCESS) {
          // if status is SUCCESS, set state friends follow by data of backend
          setFriends({
            data: page === 1 ? data.friends : [...friends.data, ...data.friends],
            full: data.friends.length < pageSize,
            loading: false,
            page: page,
          });
        }
      },
    );
  };

  useEffect(() => {
    getListFriendRequest(searchName, 1);
  }, []);

  const changeStatus = (userId: any, status: any) => {
    callApi(
      {
        method: status === 'confirm' ? 'put' : 'delete',
        api: status === 'confirm' ? config.rest.changeStatusFriend(userId) : config.rest.deleteFriend(userId),
        loading: true,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          // setFriends((friends: any) => ({
          //   ...friends,
          //   data: [...friends],
          //   // data: friends.data.filter((friendId: any) => friendId.id !== userId),
          // }));
        }
      },
    );
  };

  const loadMoreFriends = () => {
    if (friends.loading || friends.full) return;
    setFriends({ ...friends, loading: true });
    getListFriendRequest(searchName, friends.page + 1);
  };

  const searchParams: any = {
    className: 'header-topic--wrapper__search--selection__world',
    searchName,
    setSearchName,
    searchEmpty: true,
    callbackSearch: (searchValue: string) => getListFriendRequest(searchValue, 1),
    validate: config.validate.valueTypingExpressionsName,
    inputStyle: { width: 400 },
  };

  return (
    <div>
      <CContainer>
        <div className="add-friend-page-wrapper">
          <CHeader
            style={{ padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}
          >
            <h4>Friend Requests</h4>
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
                  <Link to="/consulting/add-friend">Friend List</Link>
                </li>
                <li>
                  <Link to="/consulting/search-friend">Search Friend</Link>
                </li>
              </ul>
            </div>
          </CHeader>
          <div className="add-friend-main-page-body">
            <CRow>
              {friends.data.length === 0 ? (
                <div style={{ width: 100 + '%', textAlign: 'center' }}>No result</div>
              ) : (
                friends.data.map((friend: any, index: any) => (
                  <CCol md={6} style={{ marginTop: '15px' }}>
                    <FriendItem
                      first_name={friend.first_name}
                      last_name={friend.last_name}
                      img={friend.avatar}
                      id={friend.id}
                      changeStatus={changeStatus}
                      status="confirm"
                      key={index}
                    />
                  </CCol>
                ))
              )}
            </CRow>
          </div>
          {friends.page !== 0 && friends.loading && <Frame size="large" render={loadingSmall} />}
          <Waypoint onEnter={loadMoreFriends} />
        </div>
      </CContainer>
    </div>
  );
};

export default FriendRequest;
