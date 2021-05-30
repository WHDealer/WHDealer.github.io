import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import HBButtonSmall from '../../../hbBaseClass/hbButton/HBButtonSmall';
import styles from './Payment.module.scss';

const Information: React.FC<RouteComponentProps> = () => {
  const history = useHistory();

  return (
    <div className="wide">
      <div className={styles.paymentInformation}>
        <div className="hb-mx-20">
          <div className="d-flex justify-content-between hb-my-28">
            <HBButtonSmall color="nightblue" onClick={() => history.goBack()}>
              <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
            </HBButtonSmall>
          </div>
          <h3 className={styles.title}>Information</h3>
        </div>
        <div className={styles.paymentInformationContent}>
          <div className="hb-card-white">
            <p className={styles.label}>Es zahlt sich aus Ihre Versicherungsdetails bekannt zu geben!</p>

            <div className={styles.informationContent}>
              <p className={styles.subcontent}>
                For those with statutory heath insurance the health insurance companies cover the treatment costs on
                weekdays between 7:00 a.m. and 7:00 p.m. OPutside of these times, as well as on Sundays and public
                holidays, you have to pay the treatment costs yourself.
              </p>
              <p className={styles.subcontent}>
                Since HerzBegleiter only issues private prescriptions and medical reports, you have to pay the costs of
                the medication yourself. Sick leave may not be recognized fot thhe daily sickness allowance.
              </p>
              <p className={styles.subcontent}>
                Privately insured persons can submit HerzBegleiter invoices to their insurance company as usual.
              </p>
              <p className={styles.subcontent}>
                Members of HerzBegleiter partner insurance enjoy numerous additional advantages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
