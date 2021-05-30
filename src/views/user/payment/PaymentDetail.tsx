import { CForm, CFormGroup, CLabel, CRow } from '@coreui/react';
import React, { forwardRef, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { HBButtonFull, HBButtonSmall, HBModalConfirm } from '../../../hbBaseClass';
import styles from './Payment.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = forwardRef(({ onClick }: any, ref: any) => {
  return (
    <div className={styles.iconDate} onClick={onClick} ref={ref}>
      <i className="hb-icon-calendar-date"></i>
    </div>
  );
});

const PaymentDetail: React.FC<RouteComponentProps> = () => {
  const history = useHistory();
  const [date, setDate] = useState(null);
  const [showInsuranceNumber, setShowInsuranceNumber] = useState(false);
  const [showInsuranceStatus, setShowInsuranceStatus] = useState(false);

  const handleSubmit = () => {
    history.push('/mobility/payment-success');
  };

  const handleClose = () => {
    setShowInsuranceNumber(!showInsuranceNumber);
  };

  const onChange = () => {};

  return (
    <>
      <HBModalConfirm
        show={showInsuranceNumber}
        handleClose={handleClose}
        title="Überprüfung Ihrer Krankenversicherungsnummer"
        content="Wir überprüfen Ihre Angaben auf Richtigkeit..."
        up="Übernehmen"
        upCallback={() => {
          handleClose();
        }}
        label="Krankenversicherungsnummer"
        input={{
          onChange: onChange,
          type: 'text',
          value: 'Default',
          name: 'showInsuranceNumber',
          placeholder: 'Default',
          autoComplete: 'showInsuranceNumber',
        }}
        payment
      />
      <div className="wide">
        <div className={styles.paymentInformation}>
          <div className="hb-mx-20">
            <div className="d-flex justify-content-between hb-my-28">
              <HBButtonSmall color="nightblue" onClick={() => history.goBack()}>
                <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
              </HBButtonSmall>
            </div>
            <h3 className={styles.title}>Wählen Sie Ihre Versicherung</h3>
          </div>
          <div className={styles.paymentInformationContent}>
            <div className="hb-card">
              <div className={styles.paymentDetailWrapper}>
                <p className={styles.paymentDetailTitle}>
                  Für die Abrechnung mit Ihrer Pflegekasse benötigen wir Angaben Ihrer Versichertenkarte.
                </p>
                <div className={styles.slice} />

                <CForm onSubmit={handleSubmit}>
                  <CFormGroup className={styles.paymentFormGroup}>
                    <CLabel className={styles.paymentDetailLabel}>Krankenversicherungsnummer</CLabel>
                    <div className={styles.insuranceWrapper} onClick={() => setShowInsuranceNumber(true)}>
                      Default
                      <i className={`${styles.iconTop} hb-icon-arrow-right`} />
                    </div>
                  </CFormGroup>
                  <CFormGroup className={styles.paymentFormGroup}>
                    <CLabel className={styles.paymentDetailLabel}>Versicherungstatus</CLabel>
                    <div className={styles.insuranceWrapper}>
                      Default
                      <i className={`${styles.iconDown} hb-icon-angle-down`} />
                    </div>
                  </CFormGroup>
                  <CFormGroup className={styles.paymentFormGroup}>
                    <CLabel className={styles.paymentDetailLabel}>Gültig bis</CLabel>
                    <div className={styles.date}>
                      <div className={styles.valueDate}>Default</div>
                      <div style={{ width: 50 }} className={`hb-datepicker`}>
                        <DatePicker
                          selected={date}
                          customInput={<CustomInput />}
                          onChange={(date: any) => setDate(date)}
                          yearDropdownItemNumber={40}
                          showYearDropdown
                          showMonthDropdown
                          scrollableYearDropdown
                          adjustDateOnChange
                          withPortal
                          maxDate={new Date()}
                          popperPlacement="top-end"
                        />
                      </div>
                    </div>
                  </CFormGroup>
                  <div className={styles.btnPaymentDetail}>
                    <HBButtonFull type="submit">Weiter</HBButtonFull>
                  </div>
                </CForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentDetail;
