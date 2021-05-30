import React, { useEffect, useRef } from 'react';
import { CButton, CCol, CForm, CFormGroup, CInput, CInputGroup, CInvalidFeedback, CRow } from '@coreui/react';
import { Formik } from 'formik';
import { capitalizeWords, validate } from '../../../utils';
import { useSelector } from 'react-redux';
import config from '../../../config';
import * as Yup from 'yup';
import moment from 'moment';

const validationSchema = function (values: any) {
  return Yup.object().shape({
    first_name: Yup.string().trim().required(),
    last_name: Yup.string().trim().required(),
    gender: Yup.string().trim().required(),
    date_of_birth: Yup.string().trim().required(),
    phone: Yup.string().trim().required(),
    street: Yup.string().trim().required(),
    no: Yup.string().trim().required(),
    post_code: Yup.string().trim().required(),
    place: Yup.string().trim().required(),
  });
};

interface Props {
  info: any;
  setInfo: any;
  toMe: any;
  back: any;
  next: any;
}

const EnterInformation: React.FC<Props> = (props) => {
  const { info, setInfo, toMe, back, next } = props;
  const formRef = useRef<any>(null);

  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    formRef.current.validateForm();
  }, []);

  const onSubmit = (values: any) => {
    setInfo(values);
    next();
  };

  return (
    <div className="text-center">
      <Formik
        validate={validate(validationSchema)}
        onSubmit={onSubmit}
        initialValues={{
          gender: (toMe ? auth.gender : '') || info.gender,
          first_name: (toMe ? auth.first_name : '') || info.first_name,
          last_name: (toMe ? auth.last_name : '') || info.last_name,
          date_of_birth: (toMe ? auth.birthday : '') || info.date_of_birth,
          phone: (toMe ? auth.mobile : '') || info.phone,
          street: (toMe ? auth.street : '') || info.street,
          no: (toMe ? auth.no : '') || info.no,
          post_code: (toMe ? auth.postcode : '') || info.post_code,
          place: (toMe ? auth.place : '') || info.place,
        }}
        innerRef={formRef}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
          <CForm onSubmit={handleSubmit} name="simpleForm" className="px-5">
            <div style={{ textAlign: 'left' }} className="mb-5">
              <div className="size-0">All most done!</div>
              <div className="mt-2">All you have to do is enter your address and mobile number.</div>
              <div className="mt-2">A nurse can take care of your request.</div>
            </div>
            <CFormGroup>
              <CInputGroup className="mb-4">
                <CInput
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={values.gender === 'female'}
                />
                Female
                <CInput
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={values.gender === 'male'}
                />
                Male
                <CInput
                  type="radio"
                  name="gender"
                  value="others"
                  onChange={handleChange}
                  checked={values.gender === 'others'}
                />
                Other
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CInput
                type="text"
                placeholder="First Name*"
                invalid={values.first_name?.trim() !== '' && touched.first_name && !!errors.first_name}
                maxLength={50}
                value={capitalizeWords(values.first_name)}
                onBlur={handleBlur}
                onChange={(e: any) => {
                  if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                }}
                name="first_name"
                disabled={toMe}
                required
              />
              <CInvalidFeedback>{errors.first_name}</CInvalidFeedback>
            </CFormGroup>
            <CFormGroup>
              <CInput
                type="text"
                placeholder="Last Name*"
                invalid={values.last_name?.trim() !== '' && touched.last_name && !!errors.last_name}
                maxLength={50}
                value={capitalizeWords(values.last_name)}
                onBlur={handleBlur}
                onChange={(e: any) => {
                  if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                }}
                name="last_name"
                disabled={toMe}
                required
              />
              <CInvalidFeedback>{errors.last_name}</CInvalidFeedback>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol xs="12">
                  <CInput
                    type="date"
                    min="1800-01-01"
                    max={moment().format('YYYY-MM-DD')}
                    name="date_of_birth"
                    value={values.date_of_birth}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CInput
                type="text"
                placeholder="Mobile phone number*"
                invalid={values.phone?.trim() !== '' && touched.phone && !!errors.phone}
                maxLength={20}
                value={values.phone}
                onBlur={handleBlur}
                onChange={(e: any) => {
                  if (e.target.value === '' || config.validate.valueTypingExpressionsPhone(e)) handleChange(e);
                }}
                name="phone"
                required
              />
              <CInvalidFeedback>{errors.phone}</CInvalidFeedback>
            </CFormGroup>
            <CRow>
              <CCol xs="6">
                <CFormGroup>
                  <CInput
                    type="text"
                    placeholder="Street*"
                    invalid={values.street?.trim() !== '' && touched.street && !!errors.street}
                    maxLength={50}
                    value={values.street}
                    onBlur={handleBlur}
                    onChange={(e: any) => {
                      if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                    }}
                    name="street"
                    required
                  />
                  <CInvalidFeedback>{errors.street}</CInvalidFeedback>
                </CFormGroup>
              </CCol>
              <CCol xs="6">
                <CFormGroup>
                  <CInput
                    type="text"
                    placeholder="No*"
                    invalid={values.no?.trim() !== '' && touched.no && !!errors.no}
                    maxLength={10}
                    value={values.no}
                    onBlur={handleBlur}
                    onChange={(e: any) => {
                      if (e.target.value === '' || config.validate.valueTypingExpressionsNumber(e)) handleChange(e);
                    }}
                    name="no"
                    required
                  />
                  <CInvalidFeedback>{errors.no}</CInvalidFeedback>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6">
                <CFormGroup>
                  <CInput
                    type="text"
                    placeholder="POSTCODE*"
                    invalid={values.post_code?.trim() !== '' && touched.post_code && !!errors.post_code}
                    maxLength={10}
                    value={values.post_code}
                    onBlur={handleBlur}
                    onChange={(e: any) => {
                      if (e.target.value === '' || config.validate.valueTypingExpressionsNumber(e)) handleChange(e);
                    }}
                    name="post_code"
                    required
                  />
                  <CInvalidFeedback>{errors.post_code}</CInvalidFeedback>
                </CFormGroup>
              </CCol>
              <CCol xs="6">
                <CFormGroup>
                  <CInput
                    type="text"
                    placeholder="Place*"
                    invalid={values.place?.trim() !== '' && touched.place && !!errors.place}
                    maxLength={50}
                    value={values.place}
                    onBlur={handleBlur}
                    onChange={(e: any) => {
                      if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                    }}
                    name="place"
                    required
                  />
                  <CInvalidFeedback>{errors.place}</CInvalidFeedback>
                </CFormGroup>
              </CCol>
            </CRow>
            <div className="d-flex justify-content-evenly my-5">
              <CButton style={{ width: 100 }} variant="outline" color="primary" onClick={back}>
                Back
              </CButton>
              <CButton type="submit" style={{ width: 100 }} variant="outline" color="primary" disabled={!isValid}>
                Continue
              </CButton>
            </div>
          </CForm>
        )}
      </Formik>
    </div>
  );
};

export default EnterInformation;
