import { CCol, CContainer, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import config from '../../../config';
import { loadingSmall } from '../../../extensions';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import Frame from '../mobility/Frame';
import UpComingItem from './ViewUpComingItem';
import { MenuPopup } from '../../../components';

const UpcomingMainPage: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [upcomings, setUpComings] = useState({ data: [], loading: true, full: false, page: 0 });
  const [menuPopup, setMenuPopup] = useState<any>({
    show: false,
    top: 0,
    left: 0,
    friendId: '',
    title: '',
    start_date: 0,
    end_date: 0,
  });
  const pageSize = 10;

  const getAllUpComing = (status: any, page: any) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getAllWebinars(status, page, pageSize),
        loading: page === 1,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setUpComings((upcomings: any) => {
            return {
              data: page === 1 ? data.webinars : [...upcomings.data, ...data.webinars],
              full: data.length < pageSize,
              loading: false,
              page: page,
            };
          });
        }
      },
    );
  };

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
            //update data in upcomings
            return { ...upcomings, data: newData };
          });
        }
      },
    );
  };

  useEffect(() => {
    getAllUpComing('upcoming', 1);
  }, []);

  const loadMoreWebinars = () => {
    if (upcomings.loading || upcomings.full) return;
    setUpComings({ ...upcomings, loading: true });
    getAllUpComing('live', upcomings.page + 1);
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

  return (
    <div className="upcomming-consulting">
      <CContainer>
        <CRow>
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
          {upcomings.data.map((webinar: any, index: number) => (
            <CCol md={4}>
              <UpComingItem
                title={webinar.title}
                host_name={webinar.host_name}
                description={webinar.description}
                key={index}
                id={webinar.id}
                start_date={webinar.start_date}
                created_date={webinar.created_date}
                followed={webinar.followed}
                handleOpenPopup={handleOpenPopup}
                followAndUnfollowWebinar={followAndUnfollowWebinar}
                diseases={webinar.diseases}
                end_date={webinar.end_date}
              />
            </CCol>
          ))}
        </CRow>
        {upcomings.page !== 0 && upcomings.loading && <Frame size="large" render={loadingSmall} />}
        <Waypoint onEnter={loadMoreWebinars} />
      </CContainer>
    </div>
  );
};

export default UpcomingMainPage;
