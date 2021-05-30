import { CButton, CImg } from '@coreui/react';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  id: string;
  created_date?: any;
  title: string;
  description: string;
  start_date: any;
  host_name: any;
  amount_viewers: any;
  diseases: any;
}

const WebinarItemHomeView: React.FC<Props> = (props) => {
  const { id, created_date, title, description, host_name, amount_viewers, diseases, start_date } = props;
  const name = id ? host_name : 'HerzBegleiter';
  const content: any = id ? description : 'HerzBegleiter';
  let date: any = moment(start_date * 1000).format('h:mm | MMMM D, YYYY');
  const history = useHistory();
  let ellipsisName = '';
  let ellipsisContent = '';

  if (name.length > 15) ellipsisName = name.slice(0, 12) + '...';

  if (content.length > 200) ellipsisContent = content.slice(0, 198) + '...';

  let render = (
    <div className="webinar-consulting-home-view">
      <div className="header">
        <div className="title">
          <div className="title-name" style={{ width: 180 }}>
            {title}
          </div>
          <div className="nurse-name-consulting">Nurse: {ellipsisName || name}</div>
        </div>
        <div className="views-amount">
          <i className="far fa-user"></i> <span style={{ marginLeft: 8 }}>{amount_viewers}</span>
        </div>
      </div>
      <div className="sub-header">
        <p>{date}</p>
      </div>

      <div className="content">
        <p>{ellipsisContent || content}</p>
      </div>

      <div className="diseases">
        {diseases.length === 0 ? (
          <div>No diseases</div>
        ) : (
          diseases.map((disease: any) => (
            <CButton
              key={disease.id}
              color="primary"
              style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}
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
    </div>
  );
  return (
    <div style={{ padding: '4px 3px' }} title={name}>
      <div
        className={`webinar-consulting-home-view-wrapper`}
        style={{
          margin: `${id ? '0' : '1px'} 0.4rem 0 0.4rem`,
        }}
        onClick={() => console.log('Dont touch me!')}
      >
        {render}
      </div>
    </div>
  );
};

export default WebinarItemHomeView;
