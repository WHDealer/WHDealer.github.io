import { CButton, CContainer } from '@coreui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import config, { topicsScrollSetting } from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import WebinarItemHomeView from './WebinarItemHomeView';
import UpcomingItemHomeView from './UpcomingItemHomeView';
import { MenuPopup } from '../../../components';
import { sum } from 'lodash';
import { defaultAvatar } from '../../../extensions';

const FriendItem = (props: {
  id?: string;
  first_name?: string;
  last_name?: string;
  thumbnail?: number;
  active: boolean;
}) => {
  const { id, first_name, last_name, thumbnail } = props;

  const name = id ? first_name + ' ' + last_name : 'HerzBegleiter';
  const history = useHistory();
  let ellipsisName = '';
  if (name.length > 15) ellipsisName = name.slice(0, 12) + '...';

  let render = (
    <div className="book-appointment-nurse">
      <div
        className="book-appointment-nurse-avatar"
        style={{
          backgroundImage: `url(https://d1aettbyeyfilo.cloudfront.net/herzbegleiter/16281202_1610961997217tom-circle.webp)`,
        }}
      />
      <div className="d-flex justify-content-center align-items-center" style={{ height: 70 }}>
        HerzBegleiter choose for you
      </div>
    </div>
  );
  if (id)
    render = (
      <div className="book-appointment-nurse">
        <div
          className="book-appointment-nurse-avatar"
          style={{ backgroundImage: `url("${thumbnail || defaultAvatar}")` }}
        />
        <div>{ellipsisName || name}</div>
      </div>
    );
  return (
    <div style={{ padding: '4px 3px' }} title={name}>
      <div
        className={`consulting-friend-list`}
        style={{
          margin: `${id ? '0' : '1px'} 0.4rem 0 0.4rem`,
        }}
        onClick={() => history.push(`/consulting/information/${id}`)}
      >
        {render}
      </div>
    </div>
  );
};

const ConsultingMainPage: React.FC<RouteComponentProps> = (props) => {
  const auth = useSelector((state: { auth: { first_name: string; last_name: string } }) => state.auth);
  const fullName = `${auth.last_name} ${auth.first_name} `;
  const history = useHistory();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [friends, setFriends] = useState<any>({
    data: [],
    loading: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [menuPopup, setMenuPopup] = useState<any>({
    show: false,
    top: 0,
    left: 0,
    friendId: '',
    title: '',
    start_date: 0,
    end_date: 0,
  });
  const [liveWebinars, setLiveWebinars] = useState<any>({ data: [{ diseases: [] }], loading: true });
  const [upcomings, setUpComings] = useState<any>({ data: [{ diseases: [] }], loading: true });

  let upcomingitems = upcomings.data;
  let webinaritems = liveWebinars.data;

  let sumaryUpcomingItems: any = upcomingitems || [];
  let sumaryLiveWebinarItems: any = webinaritems || [];

  if (upcomingitems.length > 5) sumaryUpcomingItems = upcomingitems.slice(0, 5);
  if (webinaritems.length > 5) sumaryLiveWebinarItems = webinaritems.slice(0, 5);

  const pageSize = 10;

  const getListFriend = () => {
    setIsLoading(true);
    callApi(
      {
        method: 'get',
        api: config.rest.getListUsers('', 1, pageSize),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        setIsLoading(false);
        if (status === SUCCESS) {
          setFriends(() => {
            return {
              data: [...data.friends],
              loading: false,
            };
          });
        }
      },
    );
  };

  const getLiveWebinars = () => {
    setIsLoading(true);
    callApi(
      {
        method: 'get',
        api: config.rest.getAllWebinars('live', 1, pageSize),
        loading: true,
      },
      (response) => {
        setIsLoading(false);
        const { data, status } = response;
        if (status === SUCCESS) {
          setLiveWebinars({
            data: [...data.webinars],
            loading: false,
          });
        }
      },
    );
  };

  const getUpcomingWebinars = () => {
    setIsLoading(true);
    callApi(
      {
        method: 'get',
        api: config.rest.getAllWebinars('upcoming', 1, pageSize),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        setIsLoading(false);
        if (status === SUCCESS) {
          setUpComings({
            data: [...data.webinars],
            loading: false,
          });
        }
      },
    );
  };

  useEffect(() => {
    let unmounted = false;
    setIsLoading(true);
    if (!unmounted) {
      setIsLoading(false);
      getListFriend();
      getLiveWebinars();
      getUpcomingWebinars();
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const followAndUnfollowWebinar = (id: any, follow: any) => {
    callApi(
      {
        method: !follow ? 'post' : 'delete',
        api: !follow ? config.rest.followWebinar(id) : config.rest.unFollowWebinar(id),
        loading: true,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          setUpComings((upcomings: any) => {
            let newData = [...upcomings.data];
            let index = newData.findIndex((item: any) => item.id === id);
            newData[index].followed = !newData[index].followed;
            return { ...upcomings, data: newData };
          });
        }
      },
    );
  };

  const handleOpenPopup = (e: any, data: any) => {
    const bound = e.target.getBoundingClientRect();
    let offsetLeft = 120;
    let width = 200;

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

  if (isLoading) return <div />;

  return (
    <div className="consulting-main-page">
      <CContainer>
        <div className="consulting-introduce" style={{ textAlign: 'center' }}>
          <h1>{`Hello ${fullName}`}</h1>
          <p>How can we help you today?</p>
          <div className="btn-link" style={{ marginBottom: '1rem' }}>
            <CButton
              color="primary"
              style={{ width: 200, padding: 10 }}
              onClick={() => history.push('/consulting/treatments')}
            >
              Book an appointment
            </CButton>
          </div>
          <div className="btn-link">
            <CButton
              color="primary"
              style={{ width: 200, padding: 10 }}
              onClick={() => history.push('/consulting/view-appointments')}
            >
              See all appointments
            </CButton>
          </div>
        </div>
        <div className="consulting-friends">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '2rem' }}>
            <h3>Friend</h3>
            <Link to="/consulting/add-friend">Show All</Link>
          </div>
          <div style={{ width: '100%' }}>
            <ScrollMenu
              {...topicsScrollSetting}
              data={
                friends.data.length === 0 ? (
                  <div>
                    <h3>There is no friend!</h3>
                    <CButton
                      color="primary"
                      style={{ width: 200, padding: 10 }}
                      onClick={() => history.push('/consulting/search-friend')}
                    >
                      Add Friend
                    </CButton>
                  </div>
                ) : (
                  friends.data.map((item: any) => <FriendItem key={item.id} {...item} />)
                )
              }
            />
          </div>
        </div>
        <div className="consulting-websinar">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
              padding: '0 10px',
            }}
          >
            <CButton color="danger">LIVE</CButton>
            <Link to="/consulting/webinar">Show All</Link>
          </div>
          <div style={{ width: '100%' }}>
            <ScrollMenu
              {...topicsScrollSetting}
              data={
                liveWebinars.data.length === 0 ? (
                  <div>There is no live websinar</div>
                ) : liveWebinars.data.length < 5 ? (
                  liveWebinars.data.map((item: any) => <WebinarItemHomeView key={item.id} {...item} />)
                ) : (
                  sumaryLiveWebinarItems.map((item: any) => <WebinarItemHomeView key={item.id} {...item} />)
                )
              }
              menuClass="menu-scroll"
            />
          </div>
        </div>
        <div className="consulting-upcomming">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
              padding: '0 10px',
            }}
          >
            <CButton color="info">UPCOMING</CButton>
            <Link to="/consulting/upcomming">Show All</Link>
          </div>
          <div style={{ width: '100%' }}>
            <MenuPopup
              {...menuPopup}
              handleClose={handleClosePopup}
              items={[
                {
                  id: 'edit',
                  label: 'Create Event',
                  icon: 'fas fa-calendar-alt',
                  handle: () => {
                    const summary = menuPopup.title;
                    const start = new Date(menuPopup.start_date * 1000).toISOString();
                    const end = new Date(menuPopup.end_date * 1000).toISOString();
                    window.open(`/google-calendar?summary=${summary}&start=${start}&end=${end}`);
                  },
                },

                // {
                //   id: 'cancel',
                //   label: 'Create Reminders',
                //   icon: 'fas fa-bars',
                //   handle: () => console.log('345'),
                // },
              ]}
            />
            <ScrollMenu
              {...topicsScrollSetting}
              data={
                upcomings.data.length === 0 ? (
                  <div>There is no live webinar</div>
                ) : upcomings.data.length === 0 ? (
                  upcomings.data.map((item: any) => (
                    <UpcomingItemHomeView
                      key={item.id}
                      {...item}
                      followAndUnfollowWebinar={followAndUnfollowWebinar}
                      handleOpenPopup={handleOpenPopup}
                    />
                  ))
                ) : (
                  sumaryUpcomingItems.map((item: any) => (
                    <UpcomingItemHomeView
                      key={item.id}
                      {...item}
                      followAndUnfollowWebinar={followAndUnfollowWebinar}
                      handleOpenPopup={handleOpenPopup}
                    />
                  ))
                )
              }
              menuClass="menu-scroll"
            />
          </div>
        </div>
      </CContainer>
    </div>
  );
};

export default ConsultingMainPage;
