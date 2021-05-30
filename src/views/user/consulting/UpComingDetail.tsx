import { CButton, CContainer, CImg } from '@coreui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { MenuPopup } from '../../../components';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TumblrShareButton,
  FacebookIcon,
  EmailIcon,
  TumblrIcon,
  LinkedinIcon,
} from 'react-share';

const UpComingDetail: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [upcoming, setUpcoming] = useState<any>({ data: { diseases: [] }, loading: true });
  const [menuPopup, setMenuPopup] = useState<any>({ show: false, top: 0, left: 0, friendId: '', title: '' });
  const param: any = props.match.params;
  const id = param.id;

  const getAllUpComing = (id: any) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getWebinarById(id),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setUpcoming({
            data: { ...data },
            loading: false,
          });
        }
      },
    );
  };

  useEffect(() => {
    getAllUpComing(id);
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
          setUpcoming((upcomings: any) => {
            let newData = { ...upcomings.data };
            //let index = newData.findIndex((item: any) => item.id === id);
            newData.followed = !newData.followed;
            //update data in upcomings
            return { ...upcomings, data: newData };
          });
        }
      },
    );
  };

  if (upcoming.loading) return <div />;

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
    <CContainer>
      <MenuPopup
        {...menuPopup}
        handleClose={handleClosePopup}
        items={[
          {
            id: 'edit',
            label: 'Create Event',
            icon: 'fas fa-calendar-alt',
            handle: () => {
              const summary = upcoming.data.title;
              const start = new Date(upcoming.data.start_date * 1000).toISOString();
              const end = new Date(upcoming.data.end_date * 1000).toISOString();
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
      <div className="upcoming-detail">
        <div className="upcoming-detail-item" style={{ width: 500 }}>
          <div className="header">
            <div className="title">{upcoming.data.title}</div>
            <div className="social-tool" style={{ cursor: 'pointer' }}>
              <div onClick={() => followAndUnfollowWebinar(upcoming.data.id, upcoming.data.followed)}>
                <i className={upcoming.data.followed ? `fas fa-bell` : `far fa-bell`}></i>
              </div>
              <Tippy
                interactive={true}
                content={
                  <>
                    <FacebookShareButton url={`https://www.youtube.com/watch?v=2YM4j-oP_qQ`} quote={'Hay qua'}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <EmailShareButton url={'https://www.youtube.com/watch?v=2YM4j-oP_qQ'} body={'Hay qua'}>
                      <EmailIcon size={32} round={true} />
                    </EmailShareButton>
                    <LinkedinShareButton url={'https://www.youtube.com/watch?v=2YM4j-oP_qQ'} summary={'Hay qua'}>
                      <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>
                    <TumblrShareButton url={'https://www.youtube.com/watch?v=2YM4j-oP_qQ'} caption={'Hay qua'}>
                      <TumblrIcon size={32} round={true} />
                    </TumblrShareButton>
                  </>
                }
              >
                <div onClick={() => console.log('23')} style={{ cursor: 'pointer' }}>
                  <i className="fas fa-share"></i>
                </div>
              </Tippy>
              {upcoming.data.followed && (
                <div onClick={(e) => handleOpenPopup(e, upcoming.data.id)}>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
              )}
            </div>
          </div>

          <div className="subheader">{moment(upcoming.data.start_date * 1000).format('h:mm | MMMM D, YYYY')}</div>
          <div className="diseases">
            {upcoming.data.diseases.length === 0 ? (
              <div>No diseases</div>
            ) : (
              upcoming.data.diseases.map((disease: any) => (
                <CButton
                  key={disease.id}
                  color="primary"
                  className="diseases-item--block"
                  onClick={() => {
                    console.log('123');
                  }}
                >
                  <CImg src={disease.thumbnail} width="20" height="20" />
                  <div className="treatment-item--title">{disease.diseases_title} </div>
                </CButton>
              ))
            )}
          </div>
          <div className="content">{upcoming.data.description}</div>
        </div>
      </div>
    </CContainer>
  );
};

export default UpComingDetail;
