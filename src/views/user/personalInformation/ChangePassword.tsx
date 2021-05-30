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
  CRow,
  CInvalidFeedback,
  CFormGroup,
  CSpinner,
  CLabel,
} from '@coreui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { clearLS, validate } from '../../../utils';
import styles from './Profile.module.scss';
import { HBButton, HBModalConfirm } from '../../../hbBaseClass';

const initialValues = {
  old_password: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = function (values: any) {
  return Yup.object().shape({
    old_password: Yup.string()
      .min(8, 'Your password must be at least 8 characters')
      .required('Your password must be at least 8 characters')
      .matches(
        config.validate.validatePassword(),
        'Your password must be at least 8 characters long with one letter, and a number',
      ),
    password: Yup.string()
      .min(8, 'Your password must be at least 8 characters')
      .required('Your password must be at least 8 characters')
      .matches(
        config.validate.validatePassword(),
        'Your password must be at least 8 characters long with one letter, and a number',
      ),
    passwordConfirmation: Yup.string()
      .required('Your password must be at least 8 characters')
      .oneOf([Yup.ref('password'), null], 'Confirmation password does not match with New Password')
      .matches(
        config.validate.validatePassword(),
        'Your password must be at least 8 characters long with one letter, and a number',
      ),
  });
};

const ChangePassword: React.FC<RouteComponentProps> = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const toggleOldPasswordVisiblity = () => {
    setOldPassword(oldPassword ? false : true);
  };
  const togglePasswordConfirmationVisiblity = () => {
    setPasswordConfirmation(passwordConfirmation ? false : true);
  };
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // const email = useSelector((state: any) => state.auth.email);

  const handleClose = () => {
    setShow(!show);
  };

  const onSubmit = (values: any) => {
    const newData = {
      old_password: values.old_password,
      new_password: values.password,
    };
    setLoading(true);
    callApi(
      {
        method: 'put',
        api: config.rest.changePasswordUser(),
        body: newData,
        enableLoading: true,
        msg: config.messages.forceChangePasswordFailure,
      },
      (response: any) => {
        const { status, id } = response;
        setLoading(false);

        if (status === SUCCESS) {
          if (id === '40') {
            setShow(true);
            clearLS();
            history.push('/sign-in');
          }
        }
      },
    );
  };

  return (
    <div className="hb-user">
      <HBModalConfirm
        show={show}
        handleClose={handleClose}
        title="Passwort ändern"
        content="Das Passwort wurde erfolgreich geändert."
        up="Schließen"
        upCallback={handleClose}
      />
      <div className={styles.changePasswordUser}>
        <CContainer className={styles.bioContainer}>
          <div className={`hb-title ${styles.title} ${styles.bioTitle}`}>Passwort ändern</div>
          <CCardGroup>
            <CCard className={styles.cardWrapper}>
              <CCardBody className={styles.cardBody}>
                <Formik initialValues={initialValues} validate={validate(validationSchema)} onSubmit={onSubmit}>
                  {({
                    values,
                    errors,
                    touched,
                    // status,
                    dirty,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    // isSubmitting,
                    isValid,
                    // handleReset,
                    // setTouched,
                  }) => (
                    <CForm onSubmit={handleSubmit}>
                      <CFormGroup className={styles.inputPassword}>
                        <CLabel className={styles.label}>Altes Passwort</CLabel>
                        <CInput
                          type={oldPassword ? 'text' : 'password'}
                          placeholder="Altes Passwort"
                          invalid={touched.old_password && !!errors.old_password}
                          autoComplete="current-password"
                          maxLength={16}
                          value={values.old_password}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            if (!target.value.includes(' ')) handleChange(e);
                          }}
                          name="old_password"
                          className={styles.inputTextPassword}
                        />
                        <i
                          className={`${oldPassword ? 'hb-icon-eye-slash' : 'hb-icon-eye'} ${styles.iconPassword}  `}
                          onClick={toggleOldPasswordVisiblity}
                        />

                        <CInvalidFeedback className={styles.invalidFeedBack}>{errors.old_password}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup className={styles.inputPassword}>
                        <CLabel className={styles.label}>Neues Passwort</CLabel>
                        <CInput
                          type={passwordShown ? 'text' : 'password'}
                          placeholder="Neues Passwort"
                          invalid={touched.password && !!errors.password}
                          autoComplete="current-password"
                          maxLength={16}
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            if (!target.value.includes(' ')) handleChange(e);
                          }}
                          name="password"
                          className={styles.inputTextPassword}
                        />
                        <i
                          className={`${passwordShown ? 'hb-icon-eye-slash' : 'hb-icon-eye'} ${styles.iconPassword}  `}
                          onClick={togglePasswordVisiblity}
                        />

                        <CInvalidFeedback className={styles.invalidFeedBack}>{errors.password}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup className={styles.inputPassword}>
                        <CLabel className={styles.label}>Neues Passwort wiederholen</CLabel>
                        <CInput
                          type={passwordConfirmation ? 'text' : 'password'}
                          placeholder="Neues Passwort wiederholen"
                          invalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                          autoComplete="current-password"
                          maxLength={16}
                          value={values.passwordConfirmation}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            if (!target.value.includes(' ')) handleChange(e);
                          }}
                          name="passwordConfirmation"
                          className={styles.inputTextPassword}
                        />
                        <i
                          className={`${passwordConfirmation ? 'hb-icon-eye-slash' : 'hb-icon-eye'} ${
                            styles.iconPassword
                          }  `}
                          onClick={togglePasswordConfirmationVisiblity}
                        />

                        <CInvalidFeedback className={styles.invalidFeedBack}>
                          {errors.passwordConfirmation}
                        </CInvalidFeedback>
                      </CFormGroup>
                      <div>
                        {/* <CButton
                                color="primary"
                                className="px-4"
                                type="submit"
                                disabled={!(isValid && dirty && !loading)}
                                style={{ width: 100 }}
                              >
                                {loading ? <CSpinner size="sm" color="light" /> : 'Update'}
                              </CButton> */}
                        <HBButton
                          color="petrol"
                          children={loading ? <CSpinner size="sm" color="light" /> : 'Passwort aktualisieren'}
                          disabled={!(isValid && dirty && !loading)}
                          btnClassName={styles.submit}
                        />
                      </div>
                    </CForm>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CContainer>
      </div>
    </div>
  );
};

export default ChangePassword;
