import React, { useState } from 'react';
import {
  CButton,
  CCol,
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
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { validate } from '../../../utils';
import ContainerAuth from '../../user/authContainers/Container';
import { HBButton, HBButtonSmall, HBModalConfirm } from '../../../hbBaseClass';
import styles from './RecoveryPassword.module.scss';

const initialValues = {
  password: '',
  passwordConfirmation: '',
};

const validationSchema = function (values: any) {
  return Yup.object().shape({
    password: Yup.string()
      .min(8, 'your-password-must-be-at-least')
      .matches(config.validate.validatePassword(), 'new-password-must-contain-numbers'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'passwords-must-match')
      .matches(config.validate.validatePassword(), 'new-password-must-contain-numbers'),
  });
};

const RecoveryPassword: React.FC<RouteComponentProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [show, setShow] = useState(false);

  const query = new URLSearchParams(props.location?.search);
  const email = query.get('email');
  const code = query.get('code');
  const type = query.get('type');

  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const togglePasswordConfirmVisiblity = () => {
    setPasswordConfirmShown(passwordConfirmShown ? false : true);
  };

  const handleClose = () => {
    setShow(!show);
    history.push('/sign-in');
  };

  const onSubmit = (values: { password: string; passwordConfirmation: string }) => {
    const body = {
      email: email,
      activate_code: code,
      new_password: values.passwordConfirmation,
    };
    callApi(
      {
        method: 'post',
        api: config.rest.confirmForgotPassword(),
        body: JSON.stringify(body),
        loading: true,
        msg: config.messages.recoveryPasswordFailure,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          setShow(true);
        }
      },
    );
  };

  if (!email || !code || !type) return <Redirect to="/sign-in" />;

  return (
    <div className="petrol">
      <HBModalConfirm
        show={show}
        handleClose={handleClose}
        title="Passwort erfolgreich geändert"
        content="Ihr Passwort wurde erfolgreich geändert, Sie können sich nun mit dem neuen Passwort anmelden."
        up="Zum Login"
        upCallback={handleClose}
      />

      <ContainerAuth className="FormAuth-container">
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
              <HBButtonSmall
                color="petrol"
                onClick={() => {
                  history.push('/sign-in');
                }}
                className={styles.btnSignUp}
              >
                <i className={`hb-icon-arrow-left ${styles.hbIcon}`} /> Zurück
              </HBButtonSmall>
              <h1 className={styles.cardTitle}>
                {/* {t('forgot-password')} {isUser ? t('user') : t('nurse')} */}
                Passwort zurücksetzen
              </h1>
              <CFormGroup className={styles.inputPassword}>
                <CInput
                  type={passwordShown ? 'text' : 'password'}
                  placeholder={'neues Passwort'}
                  invalid={values.password !== '' && touched.password && !!errors.password}
                  autoComplete="current-password"
                  maxLength={16}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={(e: any) => {
                    if (!e.target.value.includes(' ')) handleChange(e);
                  }}
                  name="password"
                  className={styles.inputTextPassword}
                />
                <i
                  className={`${passwordShown ? 'hb-icon-eye-slash' : 'hb-icon-eye'} ${styles.iconPassword}  `}
                  onClick={togglePasswordVisiblity}
                />

                <CInvalidFeedback>{t(errors.password || '')}</CInvalidFeedback>
              </CFormGroup>
              <CFormGroup className={styles.inputPassword}>
                <CInput
                  type={passwordConfirmShown ? 'text' : 'password'}
                  placeholder={'Passwort bestätigen'}
                  invalid={
                    values.passwordConfirmation !== '' && touched.passwordConfirmation && !!errors.passwordConfirmation
                  }
                  autoComplete="current-password"
                  maxLength={16}
                  value={values.passwordConfirmation}
                  onBlur={handleBlur}
                  onChange={(e: any) => {
                    if (!e.target.value.includes(' ')) handleChange(e);
                  }}
                  name="passwordConfirmation"
                  className={styles.inputTextPassword}
                />
                <i
                  className={`${passwordConfirmShown ? 'hb-icon-eye-slash' : 'hb-icon-eye'} ${styles.iconPassword}  `}
                  onClick={togglePasswordConfirmVisiblity}
                />

                <CInvalidFeedback>{t(errors.passwordConfirmation || '')}</CInvalidFeedback>
              </CFormGroup>
              <CFormGroup>
                <CRow>
                  <CCol xs="12">
                    <HBButton
                      color="violet"
                      children="Passwort zurücksetzen"
                      disabled={!(isValid && dirty)}
                      btnClassName={styles.btnSubmit}
                    />
                  </CCol>
                </CRow>
              </CFormGroup>
            </CForm>
          )}
        </Formik>
      </ContainerAuth>
    </div>
  );
};

export default RecoveryPassword;
