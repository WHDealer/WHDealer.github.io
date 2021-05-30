import React, { useState } from 'react';
import { CCol, CForm, CInput, CRow, CInvalidFeedback, CFormGroup, CLabel, CInputCheckbox } from '@coreui/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { capitalizeWords, validate } from '../../../utils';
import styles from './SignUpUser.module.scss';
import { HBButton, HBButtonSmall } from '../../../hbBaseClass/index';
import ContainerAuth from '../authContainers/Container';

const validationSchema = function (values: any) {
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .min(1, 'Der Vorname muss mindestens 1 Zeichen und weniger als 50 Zeichen lang sein.')
      .required('Der Vorname muss mindestens 1 Zeichen und weniger als 50 Zeichen lang sein.'),
    //.matches(/[A-Za-z_äöüÄÖÜùûüÿàâæéèêëïîôœÙÛÜŸÀÂÆÉÈÊËÏÎÔŒ' ]{\(1),\(50)}/,'Invalid First Name'),
    last_name: Yup.string()
      .trim()
      .min(1, 'Der Nachname muss mindestens 1 Zeichen und weniger als 50 Zeichen lang sein.')
      .required('Der Nachname muss mindestens 1 Zeichen und weniger als 50 Zeichen lang sein.'),
    email: Yup.string()
      .min(3, 'Das E-Mail Format ist nicht korrekt.')
      // .matches(/[\S]+@([\w-]+\.)+[\w-]{2,}/, 'email-format-is-incorrect')
      .matches(config.validate.validateEmail(), 'Das E-Mail Format ist nicht korrekt.')
      .required('E-Mail ist erforderlich'),
    password: Yup.string()
      .required('Ihr Passwort muss mindestens 8 Zeichen lang sein und einen Buchstaben und eine Zahl enthalten.')
      .min(8, 'Ihr Passwort muss mindestens 8 Zeichen lang sein und einen Buchstaben und eine Zahl enthalten.')
      .matches(
        config.validate.validatePassword(),
        'Ihr Passwort muss mindestens 8 Zeichen lang sein und einen Buchstaben und eine Zahl enthalten.',
      ),
    accept: Yup.bool()
      .required('* required')
      .test('accept', 'Sie müssen unsere Allgemeinen Geschäftsbedingungen akzeptieren', (value) => value === true),
  });
};

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  accept: false,
};

const SignUp: React.FC<RouteComponentProps> = (props) => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const history = useHistory();

  const [isUser, setIsUser] = useState(props.location?.state !== false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit = (values: { first_name: string; last_name: string; email: string; password: string }) => {
    const body = {
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      type: isUser ? 'user' : 'nurse',
    };
    callApi(
      {
        method: 'post',
        api: config.rest.signUpUser(),
        body: body,
        loading: true,
        msg: config.messages.signUpFailure,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) history.push({ pathname: '/zur-app', state: isUser });
      },
    );
  };

  return (
    <ContainerAuth className="FormSignUp-container">
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
          <CForm onSubmit={handleSubmit} name="simpleForm">
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
              {/* {t('sign-up')} {isUser ? t('user') : t('nurse')} */}
              {` Registrierung ${isUser ? 'Nutzer' : 'PflegeberaterIn'} `}
            </h1>
            {/* <p className="text-muted">{t('create-your-account')}</p> */}
            <CFormGroup>
              {/* <CInputGroup className="mb-3"> */}
              <CInput
                type="text"
                placeholder={'Vorname'}
                autoComplete="first_name"
                name="first_name"
                value={capitalizeWords(values.first_name)}
                onBlur={handleBlur}
                onChange={(e) => {
                  if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                }}
                maxLength={50}
                invalid={values.first_name.trim() !== '' && touched.first_name && !!errors.first_name}
                required
                className={styles.inputText}
              />
              <CInvalidFeedback>{errors.first_name || ''}</CInvalidFeedback>
              {/* </CInputGroup> */}
            </CFormGroup>
            <CFormGroup>
              {/* <CInputGroup className="mb-3"> */}
              <CInput
                type="text"
                placeholder={'Nachname'}
                autoComplete="last_name"
                name="last_name"
                maxLength={50}
                value={capitalizeWords(values.last_name)}
                onBlur={handleBlur}
                onChange={(e) => {
                  if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                }}
                invalid={values.last_name.trim() !== '' && touched.last_name && !!errors.last_name}
                required
                className={styles.inputText}
              />
              <CInvalidFeedback>{errors.last_name || ''}</CInvalidFeedback>
            </CFormGroup>
            <CFormGroup className={styles.email}>
              <CInput
                type="text"
                placeholder={'E-Mail Adresse'}
                autoComplete="email"
                name="email"
                maxLength={50}
                value={values.email}
                onBlur={handleBlur}
                onChange={(e: any) => {
                  if (!e.target.value.includes(' ')) handleChange(e);
                }}
                invalid={values.email !== '' && touched.email && !!errors.email}
                required
                className={styles.inputText}
              />
              <CInvalidFeedback>{errors.email || ''}</CInvalidFeedback>
            </CFormGroup>
            <CFormGroup className={styles.inputPassword}>
              <CInput
                type={passwordShown ? 'text' : 'password'}
                placeholder={'Passwort'}
                autoComplete="new-password"
                name="password"
                maxLength={16}
                value={values.password}
                onBlur={handleBlur}
                onChange={(e: any) => {
                  if (!e.target.value.includes(' ')) handleChange(e);
                }}
                invalid={values.password !== '' && touched.password && !!errors.password}
                required
                className={styles.inputTextPassword}
              />
              <i
                className={`${passwordShown ? 'hb-icon-eye-slash' : 'hb-icon-eye'} ${styles.iconPassword}  `}
                onClick={togglePasswordVisiblity}
              />
              <CInvalidFeedback>{errors.password || ''}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className={styles.formGroupActions}>
              <CRow>
                <CCol xs="12">
                  <div className={styles.createAccount}>
                    <div>
                      {/* {'don-t-have-an-account')} */}
                      Kein PflegeberaterIn?
                    </div>
                    <span onClick={() => setIsUser(!isUser)} className={styles.register_link}>
                      {/* {t('sign-up-now')} */}
                      Hier anmelden
                    </span>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <HBButton
                    color="violet"
                    children="Registrieren"
                    disabled={!(isValid && dirty)}
                    btnClassName={styles.btnSubmit}
                  />
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup variant="custom-checkbox" className={styles.accept}>
              <CInputCheckbox
                custom
                id="accept"
                required
                // valid={!errors.accept}
                invalid={touched.accept && !!errors.accept}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <CLabel
                variant="custom-checkbox"
                htmlFor="accept"
                style={{ textAlign: 'left' }}
              >
                Mit Ihrer Registierung akzeptieren Sie unsere{' '}
                <Link to="#" className={styles.link}>
                  Nutzungsbedinungen
                </Link>{' '}
                und{' '}
                <Link to="#" className={styles.link}>
                  AGBs
                </Link>
                .
              </CLabel>
              {/* <CInvalidFeedback>{errors.accept}</CInvalidFeedback> */}
            </CFormGroup>
          </CForm>
        )}
      </Formik>
    </ContainerAuth>
  );
};

export default SignUp;
