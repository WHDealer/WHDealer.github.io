import { CRow } from '@coreui/react';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { HBButtonFull, HBButtonSmall } from '../../../hbBaseClass';
import styles from './Payment.module.scss';

const PaymentMainPage: React.FC<RouteComponentProps> = () => {
  const history = useHistory();

  return (
    <>
      <div className="hb-mx-20">
        <div className="d-flex justify-content-between hb-my-28">
          <HBButtonSmall onClick={() => history.goBack()}>
            <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
          </HBButtonSmall>
        </div>
        <div className={styles.title}>Ihre Zahlunsart einrichten</div>
      </div>
      <div className="hb-card-shadow">
        <CRow className={styles.paymentWrapper}>
          <div className={styles.intro}>
            Sie können unseren Service kostenfrei nutzen, wenn Ihre Krankenversicherung die Kosten übernimmt.
            <span className={styles.information} onClick={() => history.push('/mobility/payment/information')}>
              Mehr erfahren
            </span>
          </div>
          <div className={styles.btnWrapper}>
            <div className={styles.btnAddPayment}>
              <HBButtonFull
                onClick={() => {
                  history.push('/mobility/type-payment');
                }}
              >
                Versicherung hinzufügen
              </HBButtonFull>
            </div>
            <div className={styles.btnSelfPayment}>
              <HBButtonFull onClick={() => {}} outline className={styles.btn}>
                Selbstzahler
              </HBButtonFull>
            </div>
          </div>
        </CRow>
      </div>
    </>
  );
};
export default PaymentMainPage;
