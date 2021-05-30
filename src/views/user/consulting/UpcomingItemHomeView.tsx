import { CButton, CImg } from '@coreui/react';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
  EmailShareButton,
  FacebookShareButton,
  // HatenaShareButton,
  // InstapaperShareButton,
  // LineShareButton,
  LinkedinShareButton,
  // LivejournalShareButton,
  // MailruShareButton,
  // OKShareButton,
  // PinterestShareButton,
  // PocketShareButton,
  // RedditShareButton,
  // TelegramShareButton,
  TumblrShareButton,
  // TwitterShareButton,
  // ViberShareButton,
  // VKShareButton,
  // WhatsappShareButton,
  // WorkplaceShareButton,
  FacebookIcon,
  EmailIcon,
  TumblrIcon,
  LinkedinIcon,
} from 'react-share';

interface Props {
  title: any;
  host_id: any;
  host_name: string;
  description: string;
  id: any;
  created_date?: any;
  start_date?: any;
  diseases: any;
  followAndUnfollowWebinar: any;
  followed: any;
  handleOpenPopup?: any;
  end_date: any;
}

const UpcomingItemHomeView: React.FC<Props> = (props) => {
  const {
    title,
    host_name,
    description,
    id,
    created_date,
    start_date,
    diseases,
    followAndUnfollowWebinar,
    followed,
    handleOpenPopup,
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

  if (name.length > 15) ellipsisName = name.slice(0, 12) + '...';

  if (content.length > 200) ellipsisContent = content.slice(0, 100) + '...';

  if (sumaryDiseases.length > 2) ellipsisDiseases = sumaryDiseases.slice(0, 2);

  let render = (
    <div className="upcoming-consulting-home-view">
      <div className="header">
        <div className="title">
          <div className="title-name" style={{ wordBreak: 'break-all', width: 180 }}>
            {title}
          </div>
          <div className="nurse-name-consulting" style={{ wordBreak: 'break-all' }}>
            Nurse: {ellipsisName || name}
          </div>
        </div>
        <div className="notification">
          <div onClick={() => followAndUnfollowWebinar(id, followed)}>
            <i className={followed ? `fas fa-bell` : `far fa-bell`}></i>
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
            <div>
              <i className="fas fa-share"></i>
            </div>
          </Tippy>

          {followed && (
            <div onClick={(e) => handleOpenPopup(e, { id, title, start_date, end_date })}>
              <i className="fas fa-ellipsis-v"></i>
            </div>
          )}
        </div>
      </div>
      <div className="sub-header" onClick={() => history.push(`/consulting/upcoming-detail/${id}`)}>
        <p>{date}</p>
      </div>

      <div className="content" onClick={() => history.push(`/consulting/upcoming-detail/${id}`)}>
        <div>{ellipsisContent || content}</div>
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
    </div>
  );
  return (
    <div style={{ padding: '4px 3px' }}>
      <div
        className={`upcoming-consulting-home-view-wrapper`}
        style={{
          margin: `${id ? '0' : '1px'} 0.4rem 0 0.4rem`,
        }}
      >
        {render}
      </div>
    </div>
  );
};

export default UpcomingItemHomeView;
