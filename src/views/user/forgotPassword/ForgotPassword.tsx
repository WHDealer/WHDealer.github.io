import React, { useState } from 'react';
import { CCol, CForm, CInput, CRow, CInvalidFeedback, CFormGroup } from '@coreui/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import config from '../../../config';
import { callApiAction, ERROR, SUCCESS } from '../../../store/callApi/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { validate } from '../../../utils';
import styles from './ForgotPassword.module.scss';
import ContainerAuth from '../authContainers/Container';
import { HBButton, HBButtonSmall, HBModalConfirm } from '../../../hbBaseClass';

const validationSchema = function (values: any) {
  return Yup.object().shape({
    email: Yup.string()
      .min(3, 'email-must-be-at-least-3-chara')
      .matches(config.validate.validateEmail(), 'email-format-is-incorrect')
      .required('email-is-required'),
  });
};

const initialValues = {
  email: '',
};

const ForgotPassword: React.FC<RouteComponentProps> = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [showModal, setShowModal] = useState<any>({ show: false, id: 0, content: '', title: '', email: '' });

  const handleClose = () => {
    setShowModal((showModal.show = !showModal.show));
  };

  const onSubmit = (values: { email: string }) => {
    callApi(
      {
        method: 'get',
        api: config.rest.forgotPasswordUser(values.email),
        loading: true,
        msg: config.messages.forgotPasswordFailure,
      },
      (response) => {
        const { status, id } = response;
        if (status === SUCCESS)
          setShowModal({
            show: true,
            title: 'Information',
            content:
              'Wir haben eine Email an Sie gesendet. Folgen Sie den Anweisungen in der Nachricht um Ihr Passwort zurückzusetzen',
          });
        if (status === ERROR)
          setShowModal({
            show: true,
            id: 31,
            content: 'Ihre E-Mail Adresse kann nicht gefunden werden.',
            title: 'Information',
          });
      },
    );
  };

  return (
    <div className="petrol">
      <HBModalConfirm
        show={showModal.show}
        handleClose={handleClose}
        title={showModal.title}
        content={showModal.content}
        up="Verstanden"
        upCallback={() => history.push('/sign-in')}
      />
      <ContainerAuth className="FormAuth-container">
        <Formik initialValues={initialValues} validate={validate(validationSchema)} onSubmit={onSubmit}>
          {({ values, errors, touched, dirty, handleChange, handleBlur, handleSubmit, isValid }) => (
            <CForm onSubmit={handleSubmit}>
              <HBButtonSmall color="petrol" onClick={() => history.push('/sign-in')} className={styles.btnSignUp}>
                <i className={`hb-icon-arrow-left ${styles.hbIcon}`} /> Zurück
              </HBButtonSmall>
              <h1 className={styles.cardTitle}>Passwort</h1>
              <h1 className={styles.cardTitleBottom}>vergessen</h1>
              <p className={styles.cardContent}>
                Geben Sie Ihre Emailadresse ein und wir senden Ihnen einen Link um Ihr Passwort zurückzusetzen.
              </p>
              <CFormGroup>
                <CInput
                  type="text"
                  placeholder={'Mailadresse'}
                  autoComplete="email"
                  invalid={values.email !== '' && touched.email && !!errors.email}
                  name="email"
                  maxLength={50}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.inputText}
                />
                <CInvalidFeedback>{t(errors.email || '')}</CInvalidFeedback>
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

export default ForgotPassword;
