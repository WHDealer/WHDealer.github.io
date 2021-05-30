import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import WebinarItem from './ViewWebinarItem';
import { Waypoint } from 'react-waypoint';
import { loadingSmall } from '../../../extensions';
import Frame from '../mobility/Frame';
import config from '../../../config';
import { CCol, CContainer, CRow } from '@coreui/react';

const WebinarMainPage: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const history = useHistory();
  const [webinars, setWebinars] = useState({ data: [], loading: true, full: false, page: 0 });
  const pageSize = 10;

  const getAllWebinar = (status: any, page: any) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getAllWebinars(status, page, pageSize),
        loading: page === 1,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setWebinars((webinars: any) => {
            return {
              data: page === 1 ? data.webinars : [...webinars.data, ...data.webinars],
              full: data.length < pageSize,
              loading: false,
              page: page,
            };
          });
        }
      },
    );
  };

  useEffect(() => {
    getAllWebinar('live', 1);
  }, []);

  const loadMoreWebinars = () => {
    if (webinars.loading || webinars.full) return;
    setWebinars({ ...webinars, loading: true });
    getAllWebinar('live', webinars.page + 1);
  };

  return (
    <div className="webinar-main-page">
      <CContainer>
        <div className="d-flex justify-content-between p-4 mb-3">
          <h3>Webinars</h3>
          <i className="fas fa-plus-circle btn-icon" onClick={() => history.push('/consulting/schedule-webinar')} />
        </div>
        <CRow>
          {webinars.data.map((webinar: any, index: number) => (
            <CCol md={4}>
              <WebinarItem
                title={webinar.title}
                host_name={webinar.host_name}
                description={webinar.description}
                amount_viewers={webinar.amount_viewers}
                key={index}
                id={webinar.id}
                start_date={webinar.start_date}
                created_date={webinar.created_date}
                diseases={webinar.diseases}
              />
            </CCol>
          ))}
        </CRow>
        {webinars.page !== 0 && webinars.loading && <Frame size="large" render={loadingSmall} />}
        <Waypoint onEnter={loadMoreWebinars} />
      </CContainer>
    </div>
  );
};

export default WebinarMainPage;
