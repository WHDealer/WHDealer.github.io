import { CButton, CImg } from '@coreui/react';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
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

interface Props {
  title?: any;
  host_id?: any;
  host_name?: string;
  description?: string;
  id?: any;
  amount_viewers?: any;
  created_date?: any;
  start_date?: any;
  diseases: any;
  followed: any;
  handleOpenPopup?: any;
  followAndUnfollowWebinar?: any;
  end_date: any;
}

const ViewUpComingItem: React.FC<Props> = (props) => {
  const {
    title,
    host_name,
    description,
    id,
    start_date,
    followed,
    handleOpenPopup,
    followAndUnfollowWebinar,
    diseases,
    end_date,
  } = props;
  const name: any = host_name || '';
  const content: any = description || '';
  let date: any = moment(start_date * 1000).format('h:mm | MMMM D, YYYY');
  const sumaryDiseases: any = diseases || [];
  const history = useHistory();
  let ellipsisName = '';
  let ellipsisContent = '';
  let ellipsisDiseases: any = [];
  if (sumaryDiseases.length > 2) ellipsisDiseases = sumaryDiseases.slice(0, 2);

  // let arr: any = [];
  // arr = diseases;

  if (name.length > 15) ellipsisName = name?.slice(0, 12) + '...';

  if (content.length > 200) ellipsisContent = content.slice(0, 198) + '...';

  let render = (
    <div className="upcoming-consulting">
      <div className="header">
        <div className="title">
          <div className="title-name">{title}</div>
          <div className="nurse-name">Nurse: {ellipsisName || name}</div>
        </div>
        <div className="notification">
          {/* <CButton> */}
          <div onClick={() => followAndUnfollowWebinar(id, followed)}>
            {followed ? <i className="fas fa-bell"></i> : <i className="far fa-bell"></i>}
          </div>

          {/* </CButton>
              <CButton> */}
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
            <div onClick={() => console.log('23')}>
              <i className="fas fa-share"></i>
            </div>
          </Tippy>

          {followed && (
            <div onClick={(e) => handleOpenPopup(e, { title, start_date, end_date })}>
              <i className="fas fa-ellipsis-v"></i>
            </div>
          )}

          {/* </CButton> */}
        </div>
      </div>
      <div className="sub-header" onClick={() => history.push(`/consulting/upcoming-detail/${id}`)}>
        <p>{date}</p>
      </div>

      <div className="content" onClick={() => history.push(`/consulting/upcoming-detail/${id}`)}>
        <p>{ellipsisContent || content}</p>
      </div>

      <div className="diseases">
        {sumaryDiseases.length === 0 ? (
          <div>No diseases</div>
        ) : sumaryDiseases.length > 2 ? (
          ellipsisDiseases.map((disease: any) => (
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
        ) : (
          sumaryDiseases.map((disease: any) => (
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
        {sumaryDiseases.length > 2 && <div>....</div>}
      </div>
      {/* <div className="diseases">
        {arr.length === 0 ? (
          <div>No diseases</div>
        ) : (
          arr.map((disease: any) => (
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
              <i className="fas fa-arrow-right"></i>
            </CButton>
          ))
        )}
      </div> */}
    </div>
  );
  return (
    <div style={{ padding: '4px 3px' }}>
      <div
        className={`upcoming-consulting-wrapper`}
        style={{
          margin: `${id ? '0' : '1px'} 0.4rem 0 0.4rem`,
        }}
      >
        {render}
      </div>
    </div>
  );
};

export default ViewUpComingItem;
