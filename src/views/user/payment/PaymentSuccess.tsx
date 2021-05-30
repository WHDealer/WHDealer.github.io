import { CRow } from '@coreui/react';
import React, { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { HBButtonFull, HBButtonSmall } from '../../../hbBaseClass';
import styles from './Payment.module.scss';
import i5 from '../../../assets/images/i5.png';

const PaymentSuccess: React.FC<RouteComponentProps> = () => {
  const history = useHistory();
  const [cardFront, setCardFront] = useState(false);

  return (
    <>
      <div className="hb-mx-20">
        <div className="d-flex justify-content-between hb-my-28">
          <HBButtonSmall onClick={() => history.goBack()}>
            <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
          </HBButtonSmall>
        </div>
        <div className={styles.title}>Ihre Zahlunsart ist eingerichtet</div>
      </div>
      <div className="hb-card-shadow">
        <CRow className={styles.paymentWrapper}>
          <div className={styles.intro}>
            Sie können unseren Service kostenfrei nutzen, wenn Ihre Krankenversicherung die Kosten übernimmt.
            <span className={styles.information} onClick={() => history.push('/mobility/payment/information')}>
              Mehr erfahren
            </span>
          </div>
          <div className={styles.btnWrapperSuccess}>
            <div className={styles.card}>
              <div
                className={styles.cardChange}
                style={{
                  display: 'flex',
                  justifyContent: cardFront ? 'space-between' : 'flex-end',
                  alignItems: 'center',
                }}
              >
                {cardFront && (
                  <div
                    style={{
                      backgroundImage: `url("${i5}")`,
                      backgroundSize: 'center',
                      backgroundRepeat: 'no-repeat',
                      width: 47,
                      height: 47,
                    }}
                  ></div>
                )}
                <div className={styles.btnAddPayment}>
                  <HBButtonFull
                    onClick={() => {
                      setCardFront(!cardFront);
                    }}
                    className={styles.btnChange}
                  >
                    {cardFront ? 'Versicherung hinzufügen' : ' Kreditkarte entfernen'}
                  </HBButtonFull>
                </div>
              </div>
              <div className={styles.cardInformation}>
                {cardFront ? 'AOK Die Gesundheitskasse' : '4222 0000 0000 0000'}
              </div>
            </div>

            {/* <div className={styles.btnAddPayment}>
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
            </div> */}
          </div>
        </CRow>
      </div>
    </>
  );
};
export default PaymentSuccess;
