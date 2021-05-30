import React from 'react';
import { CButton, CContainer, CRow } from '@coreui/react';
import { useHistory } from 'react-router-dom';

interface Props {}

const BookSuccessfully: React.FC<Props> = (props) => {
  const history = useHistory();

  return (
    <div className="d-flex justfy-content-center align-items-center" style={{ height: '50vh' }}>
      <CContainer>
        <CRow className="justify-content-center" style={{ margin: 15 }}>
          <i className="fa fa-check-circle" style={{ fontSize: 30, color: '#0B98D5' }} />
        </CRow>
        <CRow className="flex-column align-items-center">
          <div style={{ fontSize: 16, padding: '5px 10px', textAlign: 'center' }}>
            You have successfully booked an appointment!
          </div>
          <div style={{ fontSize: 16, padding: '5px 10px', textAlign: 'center' }}>
            Thank you for your request. Please check your email or Request menu to follow the request!
          </div>
          <CButton
            className="my-3"
            style={{ width: 100 }}
            variant="outline"
            color="primary"
            onClick={() => history.push('/consulting/view-appointments')}
          >
            OK
          </CButton>
        </CRow>
      </CContainer>
    </div>
  );
};

export default BookSuccessfully;
