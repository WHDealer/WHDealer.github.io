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
import { ConfirmPopup, MenuPopup } from '../../../components';

const AddFriendMainPage: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [friends, setFriends] = useState({ data: [], loading: true, full: false, page: 0 });
  const [searchName, setSearchName] = useState('');
  const pageSize = 10;
  const [menuPopup, setMenuPopup] = useState<any>({ show: false, top: 0, left: 0, friendId: '', title: '' });
  const [popupCancel, setPopupCancel] = useState({ show: false });

  const getListFriend = (searchName: any, page: any) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getListUsers(searchName, page, pageSize),
        loading: page === 1,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
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
    getListFriend(searchName, 1);
  }, []);

  const loadMoreFriends = () => {
    if (friends.loading || friends.full) return;
    setFriends({ ...friends, loading: true });
    getListFriend(searchName, friends.page + 1);
  };

  const searchParams: any = {
    className: 'header-topic--wrapper__search--selection__world',
    searchName,
    setSearchName,
    searchEmpty: true,
    callbackSearch: (searchValue: string) => getListFriend(searchValue, 1),
    validate: config.validate.valueTypingExpressionsName,
    inputStyle: { width: 400 },
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
          setFriends((friends: any) => ({
            ...friends,
            data: friends.data.filter((friend: any) => friend.id !== userId),
          }));
        }
      },
    );
  };

  const handleCancel = () => {
    setPopupCancel({ show: false });
    unFriend(menuPopup.id, 1);
    console.log('Cancel ' + menuPopup.id);
  };

  const handleOpenPopup = (e: any, data: any) => {
    const bound = e.target.getBoundingClientRect();
    let offsetLeft = 120;
    let width = 160;

    setMenuPopup({
      show: true,
      top: bound.top + window.scrollY + 10,
      left: bound.left - offsetLeft + window.scrollX + 140,
      width: width,
      ...data,
    });
  };

  const handleClosePopup = () => {
    setMenuPopup((menuPopup: any) => {
      return { ...menuPopup, show: false };
    });
  };

  return (
    <div className="add-friend-main-page" style={{ margin: '0 150px' }}>
      <CContainer>
        <div className="add-friend-page-wrapper">
          <CHeader
            style={{ padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}
          >
            <h4>Friends</h4>
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
                  <Link to="/consulting/friend-request">Friend Requests</Link>
                </li>
                <li>
                  <Link to="/consulting/search-friend">Search Friend</Link>
                </li>
              </ul>
            </div>
          </CHeader>
          <div className="add-friend-main-page-body">
            <MenuPopup
              {...menuPopup}
              handleClose={handleClosePopup}
              items={[
                {
                  id: 'edit',
                  label: 'Unfriend',
                  icon: 'fas fa-user-alt-slash',
                  handle: () => setPopupCancel({ show: true }),
                },

                {
                  id: 'cancel',
                  label: 'Cancel',
                  icon: 'fas fa-trash',
                  handle: () => setMenuPopup({ show: false }),
                },
              ]}
            />
            <ConfirmPopup
              isVisible={popupCancel.show}
              title="Cancel"
              content="Are you sure you want to unfriend?"
              leftButtonText="No"
              rightButtonText="Yes"
              leftButtonOnPress={() => setPopupCancel({ show: false })}
              rightButtonOnPress={handleCancel}
            />
            <CRow>
              {friends.data.length === 0 ? (
                <div style={{ width: 100 + '%', textAlign: 'center' }}>No result</div>
              ) : (
                friends.data.map((friend: any) => (
                  <CCol md={6} style={{ marginTop: '15px' }}>
                    <FriendItem
                      first_name={friend.first_name}
                      last_name={friend.last_name}
                      img={friend.avatar}
                      id={friend.id}
                      changeStatus={null}
                      status="friend"
                      menuPopup={menuPopup}
                      handleOpen={handleOpenPopup}
                      handleClose={handleClosePopup}
                      search={false}
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

export default AddFriendMainPage;
