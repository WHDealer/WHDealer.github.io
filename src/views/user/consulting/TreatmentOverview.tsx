import React from 'react';
import { CButton } from '@coreui/react';
import { timestampToHour } from '../../../utils';
import { ls } from '../../../extensions';
import moment from 'moment';

interface Props {
  sendData: any;
  book: any;
  info: any;
  setStep: any;
  back: any;
}

const TreatmentOverview: React.FC<Props> = (props) => {
  const { sendData, book, info, setStep, back } = props;

  return (
    <div className="px-5">
      <h3 className="mb-5">Overview of your request</h3>
      <div className="d-flex justify-content-between pt-3 pb-2">
        <div>Your treatment</div>
      </div>
      <input value={ls.get('treatmentTitle') || ''} className="form-control overview-disabled" disabled />
      <div className="d-flex justify-content-between pt-3 pb-2">
        <div>Date</div>
        <div className="link" onClick={() => setStep('book-appointment')}>
          Change <i className="fa fa-pencil" />
        </div>
      </div>
      <input
        value={moment(book.appointment_time_begin * 1000).format('dddd DD.MM.YYYY')}
        className="form-control overview-disabled"
        disabled
      />
      <div className="d-flex justify-content-between pt-3 pb-2">
        <div>Time</div>
        <div className="link" onClick={() => setStep('book-appointment')}>
          Change <i className="fa fa-pencil" />
        </div>
      </div>
      <input
        value={`${timestampToHour(book.appointment_time_begin)} - ${timestampToHour(book.appointment_time_end)}`}
        className="form-control overview-disabled"
        disabled
      />
      <div className="d-flex justify-content-between pt-3 pb-2">
        <div>Your phone number</div>
        <div className="link" onClick={() => setStep('enter-info')}>
          Change <i className="fa fa-pencil" />
        </div>
      </div>
      <input value={info.phone} className="form-control overview-disabled" disabled />
      <div className="d-flex justify-content-evenly my-5">
        <CButton style={{ width: 100 }} variant="outline" color="primary" onClick={back}>
          Back
        </CButton>
        <CButton style={{ width: 100 }} variant="outline" color="primary" onClick={sendData}>
          Done
        </CButton>
      </div>
    </div>
  );
};

export default TreatmentOverview;
