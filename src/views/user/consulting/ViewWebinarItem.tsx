import { CButton, CImg } from '@coreui/react';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';

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
}

const ViewAllWebinarItem: React.FC<Props> = (props) => {
  const { title, host_name, description, id, amount_viewers, created_date, start_date, diseases } = props;

  const name: any = id ? host_name : 'HerzBegleiter';
  const content: any = description;
  let date: any = moment(start_date * 1000).format('h:mm | MMMM D, YYYY');
  const sumaryDiseases: any = diseases;

  // const history = useHistory();
  let ellipsisName = '';
  let ellipsisContent = '';
  let ellipsisDiseases: any = [];

  if (name.length > 15) ellipsisName = name?.slice(0, 12) + '...';

  if (content.length > 200) ellipsisContent = content.slice(0, 198) + '...';

  let render = (
    <div className="webinar-consulting">
      <div className="header">
        <div className="title">
          <div className="title-name">{title}</div>
          <div className="nurse-name">Nurse: {ellipsisName || name}</div>
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
    <div style={{ padding: '4px 3px' }} title={name}>
      <div
        className={`webinar-consulting-wrapper`}
        style={{
          margin: `${id ? '0' : '1px'} 0.4rem 0 0.4rem`,
        }}
        // onClick={() => history.push(`/consulting/information/${id}`)}
      >
        {render}
      </div>
    </div>
  );
};

export default ViewAllWebinarItem;
