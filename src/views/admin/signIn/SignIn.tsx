import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
  CFormGroup,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../../../store/auth/actions';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { setUserLS, validate } from '../../../utils';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { ls } from '../../../extensions';
import config from '../../../config';

const validationSchema = function (values: any) {
  return Yup.object().shape({
    email: Yup.string()
      .required('email-must-be-at-least-3-chara')
      .min(3, 'email-must-be-at-least-3-chara')
      .matches(config.validate.validateEmail(), 'email-format-is-incorrect'),
    // .matches(
    //   /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])@(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    //   'Invalid email'
    // ),
    password: Yup.string()
      .required('password-must-contain-numbers')
      .min(8, 'password-must-contain-numbers')
      .matches(config.validate.validatePassword(), 'password-must-contain-numbers'),
  });
};

const initialValues = {
  email: '',
  password: '',
};

const SignIn: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit = (values: { email: string; password: string }) => {
    callApi(
      {
        method: 'post',
        api: config.rest.signInAdmin(),
        body: values,
        loading: true,
        msg: config.messages.signInFailure,
      },
      (response) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          const dataExtra = { ...data, email: values.email };
          dispatch(signIn(dataExtra));
          if (data.challengename) {
            history.push('/admin/reset-password');
            ls.set('email', values.email);
            ls.set('session', data.session);
          } else {
            setUserLS(dataExtra);
            history.push(config.routes.managerUsers());
          }
        }
      },
    );
  };

  return (
    <div className="hb-admin c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik initialValues={initialValues} validate={validate(validationSchema)} onSubmit={onSubmit}>
                    {({
                      values,
                      errors,
                      touched,
                      status,
                      dirty,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      isValid,
                      handleReset,
                      setTouched,
                    }) => (
                      <CForm onSubmit={handleSubmit}>
                        <h1>{t('sign-in-admin')}</h1>
                        <p className="text-muted">{t('sign-in-to-your-account')}</p>
                        <CFormGroup>
                          <CInputGroup className="mb-3">
                            <CInput
                              type="text"
                              placeholder="Email"
                              autoComplete="email"
                              invalid={values.email !== '' && touched.email && !!errors.email}
                              name="email"
                              maxLength={50}
                              value={values.email}
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                if (!e.target.value.includes(' ')) handleChange(e);
                              }}
                            />
                            <CInvalidFeedback>{t(errors.email || '')}</CInvalidFeedback>
                          </CInputGroup>
                        </CFormGroup>
                        <CFormGroup>
                          <CInputGroup className="mb-3">
                            <CInput
                              type={passwordShown ? 'text' : 'password'}
                              placeholder="Password"
                              invalid={values.password !== '' && touched.password && !!errors.password}
                              autoComplete="current-password"
                              maxLength={16}
                              value={values.password}
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                if (!e.target.value.includes(' ')) handleChange(e);
                              }}
                              name="password"
                            />
                            <CInputGroupPrepend style={{ cursor: 'pointer' }}>
                              <CInputGroupText onClick={togglePasswordVisiblity}>
                                <CIcon name={passwordShown ? 'cil-lock-locked' : 'cil-lock-unlocked'} />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInvalidFeedback>{t(errors.password || '')}</CInvalidFeedback>
                          </CInputGroup>
                        </CFormGroup>
                        <CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CButton color="primary" className="px-4" type="submit" disabled={!(isValid && dirty)}>
                                {t('sign-in')}
                              </CButton>
                            </CCol>
                          </CRow>
                        </CFormGroup>
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default SignIn;
