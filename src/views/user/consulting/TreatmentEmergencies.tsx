import React from 'react';
import { CButton, CContainer } from '@coreui/react';
import { Link } from 'react-router-dom';

interface Props {
  next: () => void;
  back: () => void;
}

const TreatmentEmergenciesPage: React.FC<Props> = (props) => {
  const { next, back } = props;

  return (
    <div className="treatment-emergencies-page">
      <CContainer>
        <div className="treatment-emergencies-page__title">
          <h2> Selected treatment</h2>
          <h5 className="treatment-emergencies-page-subtitle">Call 112 immediately for emergencies</h5>
          <p className="treatment-emergencies-page--quote">
            If you have acute symptoms such as severe shortness of breath, dial 112 directly.
          </p>
        </div>
        <div className="treatment-emergencies-page__content">
          <div className="treatment-emergencies-page__content--rules">
            <h5 className="treatment-emergencies-page__content--rules-title">This is how it works</h5>
            <span>- Fill out on appointments request</span> <br />
            <span>- Receive appointment confirmation email</span>
            <br />
            <span>- Talk to nurse via video using the HB app</span>
            <br />
          </div>

          <h5 className="treatment-emergencies-page__content--question">Help or question?</h5>
          <span className="treatment-emergencies-page__content--contact-us">
            Contact us via <Link to="#">support email</Link>{' '}
          </span>
        </div>
        <CButton
          variant="outline"
          color="primary"
          style={{ marginRight: '20px', width: '100px' }}
          onClick={() => back()}
        >
          Back
        </CButton>
        <CButton variant="outline" color="primary" style={{ width: '100px' }} onClick={() => next()}>
          Continue
        </CButton>
      </CContainer>
    </div>
  );
};

export default TreatmentEmergenciesPage;
