import React, { useState, useRef, useEffect } from 'react';
import {
  CModal,
  CCol,
  CModalHeader,
  CRow,
  CModalBody,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CForm,
  CInput,
  CInputGroup,
  CInvalidFeedback,
  CFormGroup,
  CSelect,
  CInputGroupPrepend,
  CInputGroupText,
  CModalFooter,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import config, { types } from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { capitalizeWords, formatDate, getErrorsFromValidationError } from '../../../utils';
import { DatePicker } from '../../../components';
import FieldName from '../containers/FieldName';

const validationSchema = function (values: any, emailExist: any) {
  return Yup.object().shape({
    first_name: Yup.string().trim().required('first-name-must-be-at-least-1'),
    last_name: Yup.string().trim().required('last-name-must-be-at-least-1-c'),
    email: Yup.string()
      .notOneOf([emailExist.email], 'this-email-already-exists-ple')
      .matches(config.validate.validateEmail(), 'email-format-is-incorrect')
      .required('email-must-be-at-least-3-chara'),
    password: Yup.string()
      .trim()
      .min(8, 'your-password-must-be-at-least')
      .required('your-password-must-be-at-least')
      .matches(config.validate.validatePassword(), 'your-password-must-be-at-least'),
  });
};

const validate = (getValidationSchema: any, emailExist: any) => {
  return (values: any) => {
    const validationSchemas = getValidationSchema(values, emailExist);
    try {
      validationSchemas.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

interface Props {
  searchUsers: () => void;
  handleClose: () => void;
  show: boolean;
  initialValues: any;
}

const ModalCreateUser: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const { searchUsers, handleClose, show, initialValues } = props;
  const [emailExist, setEmailExist] = useState({ email: '', text: '' });
  const [passwordShown, setPasswordShown] = useState(true);
  const formRef = useRef<any>(null);

  const [birthDate, setBirthDate] = useState<any>(null);

  useEffect(() => {
    if (!show) return;
    setBirthDate(null);
    formRef.current.resetForm();
  }, [show]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit = (values: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    type: string;
    status_id: string;
    gender: string;
  }) => {
    const newValues = {
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      status_id: Number(values.status_id),
      gender: Number(values.gender),
      birth_date: formatDate(birthDate),
    };
    const body = JSON.stringify(newValues);

    callApi(
      {
        method: 'post',
        api: config.rest.createUser(),
        body: body,
        loading: true,
      },
      (response) => {
        const { status, text, id } = response;
        if (status === SUCCESS) {
          searchUsers();
          handleClose();
        } else if (id === '2') {
          setEmailExist({ email: newValues.email, text: text });
          formRef.current.validateForm();
        }
      },
    );
  };

  const [attention, setAttention] = useState(false);

  const newHandleClose = () => {
    formRef.current.resetForm();
    props.handleClose();
    setAttention(false);
  };

  const showAttention = () => {
    if (!formRef.current.dirty && !birthDate) {
      newHandleClose();
      return;
    }
    setAttention(true);
  };

  return (
    <div className="flex-row align-items-center">
      <CModal centered show={show} onClose={handleClose} closeOnBackdrop={false}>
        <CModalHeader>
          {t('create-new-user')}
          <i className="fa fa-close cursor-pointer" onClick={showAttention} />
        </CModalHeader>
        <CModalBody className="popup--update-user">
          <CModal size="sm" show={attention} centered closeOnBackdrop={false}>
            <CModalBody style={{ textAlign: 'center' }}>Are you sure you want to discard your changes?</CModalBody>
            <CModalFooter style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button className="btn btn-danger" style={{ width: 160 }} color="danger" onClick={newHandleClose}>
                Discard
              </button>
              <button style={{ width: 160 }} className="btn btn-primary" onClick={() => setAttention(false)}>
                Keep Editing
              </button>
            </CModalFooter>
          </CModal>
          <CRow className="justify-content-center">
            <CCol md="12">
              <CCardGroup>
                <CCard className="popup--update-user__card--wrapper">
                  <CCardBody>
                    <Formik
                      innerRef={formRef}
                      enableReinitialize={true}
                      initialValues={initialValues}
                      validate={validate(validationSchema, emailExist)}
                      onSubmit={onSubmit}
                    >
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
                          <CFormGroup className="mb-3">
                            <FieldName label="First Name" width={110}>
                              <CInput
                                type="text"
                                placeholder={t('first-name')}
                                invalid={values.first_name.trim() !== '' && touched.first_name && !!errors.first_name}
                                autoComplete="first_name"
                                maxLength={50}
                                value={capitalizeWords(values.first_name)}
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                                }}
                                name="first_name"
                              />
                              <CInvalidFeedback>{t(errors.first_name || '')}</CInvalidFeedback>
                            </FieldName>
                          </CFormGroup>
                          <CFormGroup className="mb-3">
                            <FieldName label="Last Name" width={110}>
                              <CInput
                                type="text"
                                placeholder={t('last-name')}
                                invalid={values.last_name.trim() !== '' && touched.last_name && !!errors.last_name}
                                autoComplete="last_name"
                                maxLength={50}
                                value={capitalizeWords(values.last_name)}
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                                }}
                                name="last_name"
                              />
                              <CInvalidFeedback>{t(errors.last_name || '')}</CInvalidFeedback>
                            </FieldName>
                          </CFormGroup>
                          <CFormGroup className="mb-3">
                            <FieldName label="Email" width={110}>
                              <CInput
                                type="text"
                                placeholder={t('email')}
                                maxLength={50}
                                invalid={values.email !== '' && touched.email && !!errors.email}
                                autoComplete="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  if (!e.target.value.includes(' ')) handleChange(e);
                                }}
                                name="email"
                              />
                              <CInvalidFeedback>{t(errors.email || '')}</CInvalidFeedback>
                            </FieldName>
                          </CFormGroup>
                          <CFormGroup className="mb-3">
                            <FieldName label="Password" width={110}>
                              <CInputGroup>
                                <CInput
                                  type={passwordShown ? 'text' : 'password'}
                                  placeholder={t('password')}
                                  invalid={values.password !== '' && touched.password && !!errors.password}
                                  autoComplete="password"
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
                            </FieldName>
                          </CFormGroup>
                          <CFormGroup className="mb-3">
                            <FieldName label="Gender" width={110}>
                              <div className="d-flex">
                                <CInput
                                  type="radio"
                                  name="gender"
                                  value="0"
                                  onChange={handleChange}
                                  checked={values.gender === '0'}
                                />
                                Male
                                <CInput
                                  type="radio"
                                  name="gender"
                                  value="1"
                                  onChange={handleChange}
                                  checked={values.gender === '1'}
                                />
                                Female
                                <CInput
                                  type="radio"
                                  name="gender"
                                  value="2"
                                  onChange={handleChange}
                                  checked={values.gender === '2'}
                                />
                                Other
                              </div>
                            </FieldName>
                          </CFormGroup>
                          <div className="mb-3">
                            <FieldName label="Date Of Birth" width={110}>
                              <DatePicker date={birthDate} setDate={setBirthDate} fullWidth />
                            </FieldName>
                          </div>
                          <CFormGroup>
                            <FieldName label="Status" width={110}>
                              <CSelect value={values.status_id} onChange={handleChange} name="status_id">
                                <option value={3}>Approved</option>
                                <option value={2}>Disapproved</option>
                              </CSelect>
                            </FieldName>
                          </CFormGroup>
                          <div style={{ textAlign: 'right' }}>
                            <CButton
                              color="primary"
                              className="px-4"
                              type="submit"
                              disabled={
                                !isValid ||
                                !birthDate ||
                                !['0', '1', '2'].includes(values.gender) ||
                                (!dirty && birthDate === initialValues.birth_date)
                              }
                            >
                              {t('create')}
                            </CButton>
                          </div>
                        </CForm>
                      )}
                    </Formik>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default ModalCreateUser;
