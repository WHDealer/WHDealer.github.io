import React, { forwardRef, useState } from 'react';
import { CCol, CForm, CRow, CFormGroup, CLabel } from '@coreui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createDate, validate } from '../../../utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import styles from './InitProfile.module.scss';
import { HBButtonFull, HBButtonSmall } from '../../../hbBaseClass/index';

const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
  return (
    <div className={styles.iconDate} onClick={onClick} ref={ref}>
      <i className="hb-icon-calendar-date"></i>
    </div>
  );
});

const validationSchema = function (values: any) {
  return Yup.object().shape({
    first_name: Yup.string().trim().required('First name is required'),
    last_name: Yup.string().trim().required('Last name is required'),
  });
};

interface Props {
  uploadMetaData: any;
  data: {
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    gender: number;
  };
  next: () => void;
  formRef?: any;
  prev: () => void;
}

const PersonalInformation: React.FC<Props> = (props) => {
  const { uploadMetaData, data, next, formRef, prev } = props;

  const [dateOfBirth, setDateOfBirth] = useState<any>(data.date_of_birth ? createDate(data.date_of_birth) : null);
  const [gender, setGender] = useState<number>(data.gender);

  const onSubmit = (values: any) => {
    const newDate = moment(dateOfBirth).format('DD/MM/YYYY');
    if (
      values.first_name === data.first_name &&
      values.last_name === data.last_name &&
      newDate === data.date_of_birth &&
      gender === data.gender
    ) {
      next();
      return;
    }
    const newData = { ...data, ...values, date_of_birth: newDate, gender: gender, step: 1 };
    uploadMetaData(newData, next);
  };

  return (
    <div className={styles.PersonalInformation}>
      <Formik initialValues={data} onSubmit={onSubmit} validate={validate(validationSchema)}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
          <CForm onSubmit={handleSubmit} name="simpleForm">
            <p className={styles.title}>Persönliche Informationen</p>
            <CFormGroup className={styles.genderGroup}>
              <CLabel>Geschlecht</CLabel>
              <div className={styles.gender}>
                <HBButtonSmall
                  type="button"
                  color="petrol"
                  onClick={() => setGender(1)}
                  className={`${styles.btnGender} ${gender === 1 ? 'is-selected' : ''}`}
                >
                  Weiblich
                </HBButtonSmall>
                <HBButtonSmall
                  type="button"
                  color="petrol"
                  onClick={() => setGender(0)}
                  className={`${styles.btnGender} ${gender === 0 ? 'is-selected' : ''}`}
                >
                  Männlich
                </HBButtonSmall>
                <HBButtonSmall
                  type="button"
                  color="petrol"
                  onClick={() => setGender(2)}
                  className={`${styles.btnGender} ${gender === 2 ? 'is-selected' : ''}`}
                >
                  Andere
                </HBButtonSmall>
              </div>
            </CFormGroup>
            <CFormGroup className={styles.dateGroup}>
              <CRow>
                <CCol xs="12">
                  <CLabel>Geburtstag</CLabel>
                  <div className={styles.date}>
                    <div className={styles.valueDate}>
                      {dateOfBirth ? moment(dateOfBirth).format('DD.MM.YYYY') : 'TT.MM.JJJJ'}
                    </div>
                    <div style={{ width: 50 }} className={`hb-datepicker ${styles.dataPicker}`}>
                      <DatePicker
                        selected={dateOfBirth}
                        customInput={<CustomInput />}
                        onChange={(date: any) => setDateOfBirth(date)}
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
                </CCol>
              </CRow>
            </CFormGroup>
            <div className={styles.footer}>
              <div className={styles.wrapperBack}>
                <HBButtonFull color="petrol" outline children="Überspringen" type="button" onClick={prev} />
              </div>
              <div className={styles.wrapperBack}>
                <HBButtonFull
                  color="petrol"
                  children="Weiter"
                  disabled={!(isValid && (gender !== 3 || gender !== null) && dateOfBirth)}
                />
              </div>
            </div>
          </CForm>
        )}
      </Formik>
    </div>
  );
};

export default PersonalInformation;
