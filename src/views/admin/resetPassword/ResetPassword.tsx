import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { signIn } from '../../../store/auth/actions';
import { ls } from '../../../extensions';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setUserLS, validate } from '../../../utils';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';

const validationSchema = function (values: any) {
  return Yup.object().shape({
    password: Yup.string()
      .min(8, 'your-password-must-be-at-least')
      .required('your-password-must-be-at-least')
      .matches(config.validate.validatePassword(), 'your-password-must-be-at-least'),
    passwordConfirmation: Yup.string()
      .required('your-password-must-be-at-least')
      .oneOf([Yup.ref('password'), null], 'passwords-must-match')
      .matches(config.validate.validatePassword(), 'your-password-must-be-at-least'),
  });
};

const initialValues: {
  password: string;
  passwordConfirmation: string;
} = {
  password: '',
  passwordConfirmation: '',
};

const ResetPassword: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const email = ls.get('email');
  const session = ls.get('session');

  if (!email || !session) return <Redirect to="/admin/sign-in" />;

  const onSubmit = (values: { password: string; passwordConfirmation: string }) => {
    const newData = {
      email: email,
      new_password: values.passwordConfirmation,
      session: session,
    };
    callApi(
      {
        method: 'post',
        api: config.rest.forceChangePassword(),
        body: newData,
        loading: true,
        msg: config.messages.forceChangePasswordFailure,
      },
      (response) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          const dataExtra = { ...data, email: newData.email };
          setUserLS(dataExtra);
          dispatch(signIn(dataExtra));
          history.push(config.routes.managerUsers());
        }
      },
    );
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
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
                        <h1>{t('reset-password')}</h1>
                        <p className="text-muted">{t('change-your-password')}</p>
                        <CFormGroup>
                          <CInputGroup className="mb-3">
                            <CInput
                              type={passwordShown ? 'text' : 'password'}
                              placeholder={t('password')}
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
                          <CInputGroup className="mb-3">
                            <CInput
                              type={passwordShown ? 'text' : 'password'}
                              placeholder={t('password-confirmation')}
                              invalid={
                                values.passwordConfirmation !== '' &&
                                touched.passwordConfirmation &&
                                !!errors.passwordConfirmation
                              }
                              autoComplete="current-password"
                              maxLength={16}
                              value={values.passwordConfirmation}
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                if (!e.target.value.includes(' ')) handleChange(e);
                              }}
                              name="passwordConfirmation"
                            />
                            <CInputGroupPrepend style={{ cursor: 'pointer' }}>
                              <CInputGroupText onClick={togglePasswordVisiblity}>
                                <CIcon name={passwordShown ? 'cil-lock-locked' : 'cil-lock-unlocked'} />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInvalidFeedback>{t(errors.passwordConfirmation || '')}</CInvalidFeedback>
                          </CInputGroup>
                        </CFormGroup>
                        <CFormGroup>
                          <CRow>
                            <CCol xs="6">
                              <CButton color="primary" className="px-4" type="submit" disabled={!(isValid && dirty)}>
                                {t('update')}
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

export default ResetPassword;
