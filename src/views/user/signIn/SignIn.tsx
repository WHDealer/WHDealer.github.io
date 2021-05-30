import React, { useState } from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CCol, CForm, CInput, CRow, CInvalidFeedback, CFormGroup } from '@coreui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useTranslation } from 'react-i18next';
import { signIn } from '../../../store/auth/actions';
import config from '../../../config';
import { setUserLS, validate } from '../../../utils';
import { ls } from '../../../extensions';
import axios from 'axios';
import styles from './SignInUser.module.scss';
import { HBButton, HBModalConfirm } from '../../../hbBaseClass/index';
import ContainerAuth from '../authContainers/Container';

const validationSchema = function (values: any) {
  return Yup.object().shape({
    email: Yup.string()
      .trim()
      .min(3, 'Das E-Mail Format ist nicht korrekt.')
      .matches(config.validate.validateEmail(), 'Das E-Mail Format ist nicht korrekt.'),
    password: Yup.string()
      .required('Ihr Passwort muss mindestens 8 Zeichen, eine Buchstabe und eine Zahl enthalten.')
      .min(8, 'Ihr Passwort muss mindestens 8 Zeichen, eine Buchstabe und eine Zahl enthalten.')
      .matches(
        config.validate.validatePassword(),
        'Ihr Passwort muss mindestens 8 Zeichen, eine Buchstabe und eine Zahl enthalten.',
      ),
  });
};

const initialValues = {
  email: '',
  password: '',
};

const initialDevicesBrowser = async (email: string) => {
  let deviceId = ls.get('device_id');
  if (deviceId) return;
  let pushToken = ls.get('push_token');

  await axios
    .post(config.rest.initialDevice(), {
      email_address: email,
      phone_number: '',
      push_token: pushToken || '',
      subscribed: '',
      last_activate: '',
      first_session: '',
      device_name: 'ReactJS',
      sessions: '',
      app_version: '',
      country: '',
      ip_address: '',
      sdk_version: '',
      lat: '',
      long: '',
      usage_duration: '',
      language_code: '',
      external_user_id: '',
      segments: '',
      tags: '',
    })
    .then(function (response) {
      if (response.data.message.status === 'success') {
        ls.set('device_id', response.data.data.device_id);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const SignIn: React.FC<RouteComponentProps> = (props) => {
  // const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const [resendData, setResendData] = useState<any>({ show: false, id: 0, content: '', title: '', email: '' });

  // const [isUser, setIsUser] = useState(props.location?.state !== false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit = (values: { email: string; password: string }) => {
    callApi(
      {
        method: 'post',
        api: config.rest.signInUser(),
        body: values,
        loading: true,
        msg: config.messages.signInFailure,
      },
      (response) => {
        const { id, status, data } = response;
        if (status !== SUCCESS) {
          // id 22 => email has not been verified
          if (id === '22')
            setResendData({
              show: true,
              id: 22,
              content:
                'Ihre Mailadresse wurde noch nicht bestätigt. Bitte bestätigen Sie Ihre Mailadresse indem Sie auf den Aktivierungslink klicken.',
              title: 'Login fehlgeschlagen',
              email: values.email,
            });
          if (id === '28' || id === '23')
            setResendData({
              show: true,
              id: 28 || 23,
              content: 'Ungültige Mailadresse oder Passwort. Bitte versuchen Sie es erneut.',
              title: 'Login fehlgeschlagen',
            });
          if (id === '26')
            setResendData({
              show: true,
              id: 26,
              content:
                'Ihr Account wurde gesperrt. Bitte kontaktieren Sie unseren Kundenservice um den Account freizuschalten.',
              title: 'Login fehlgeschlagen',
            });
        } else {
          let location = '/newsfeed';
          if (id === '21') location = '/init-profile';
          else if (data.group_name === 'nurse') {
            location = '/consulting';
          }
          const dataExtra = { ...data, email: values.email };
          setUserLS(dataExtra);
          dispatch(signIn(dataExtra));
          initialDevicesBrowser(values.email);
          history.push(location);
        }
      },
    );
  };

  const handleClose = () => {
    setResendData((resendData.show = false));
  };
  const resend = (email: any) => {
    handleClose();
    callApi({
      method: 'get',
      api: config.rest.resendVerifyEmail(email),
      msg: config.messages.resendVerifyEmailFailure,
    });
  };

  return (
    <>
      <div className="petrol">
        <HBModalConfirm
          show={resendData.show}
          handleClose={handleClose}
          title={resendData.title}
          content={resendData.content}
          up="Zurück zur Anmeldung"
          upCallback={handleClose}
          down={resendData.id === 22 ? 'Weiter bearbeiten' : ''}
          downCallback={() => (resendData.id === 22 ? resend(resendData.email) : {})}
        />
      </div>

      <ContainerAuth className="FormSignIn-container">
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
              <h1 className="form-card-title">Willkommen Wir haben Sie vermisst!</h1>
              <CFormGroup className={styles.email}>
                <CInput
                  type="text"
                  placeholder="E-Mail Adresse"
                  autoComplete="email"
                  invalid={values.email !== '' && touched.email && !!errors.email}
                  name="email"
                  maxLength={50}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={(e: any) => {
                    if (!e.target.value.includes(' ')) handleChange(e);
                  }}
                  className={styles.inputText}
                />
                <CInvalidFeedback>{errors.email || ''}</CInvalidFeedback>
              </CFormGroup>
              <CFormGroup className={styles.inputPassword}>
                <CInput
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="Passwort"
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

                <CInvalidFeedback>{errors.password || ''}</CInvalidFeedback>
              </CFormGroup>
              <CFormGroup className={styles.lastFormGroup}>
                <CRow>
                  <CCol xs="12" className={styles.forgotPassword}>
                    <Link to={{ pathname: '/forgot-password', state: true }}>Passwort vergessen?</Link>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <HBButton
                      color="violet"
                      children="Login"
                      disabled={!(isValid && dirty)}
                      btnClassName={styles.btnSubmit}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <div className={styles.createAccount}>
                      <div>Noch keinen Account?</div>
                      <Link to={{ pathname: '/sign-up', state: true }} className={styles.register_link}>
                        Hier Registrieren
                      </Link>
                    </div>
                  </CCol>
                </CRow>
              </CFormGroup>
            </CForm>
          )}
        </Formik>
      </ContainerAuth>
    </>
  );
};

export default SignIn;
