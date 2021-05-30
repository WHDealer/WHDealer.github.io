import React from 'react';
import { CButton, CContainer } from '@coreui/react';

interface Props {
  setToMe: any;
  back: () => void;
  next: () => void;
}

const TreatmentForWhom: React.FC<Props> = (props) => {
  const { setToMe, back, next } = props;

  return (
    <div className="treatment-for-who">
      <CContainer>
        <h3 className="treatment-for-who__title">Who is the treatment for?</h3>
        <div className="treatment-for-who__content">
          <CButton
            color="primary"
            style={{ width: 140 }}
            onClick={() => {
              next();
              setToMe(true);
            }}
          >
            To me
          </CButton>
          <CButton
            color="primary"
            style={{ width: 140 }}
            onClick={() => {
              next();
              setToMe(false);
            }}
          >
            Others
          </CButton>
        </div>
        <div className="d-flex mx-5 my-5">
          <CButton style={{ width: 100 }} variant="outline" color="primary" onClick={back}>
            Back
          </CButton>
        </div>
      </CContainer>
    </div>
  );
};

export default TreatmentForWhom;
