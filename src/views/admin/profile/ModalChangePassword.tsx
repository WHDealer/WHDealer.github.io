import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
  CSpinner,
} from '@coreui/react';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css';
import * as Yup from 'yup';
import config from '../../../config';
import { ErrorMessage } from '../../../theme/styles';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import CIcon from '@coreui/icons-react';
import { clearLS } from '../../../utils';
import { useHistory } from 'react-router';

interface ModalChangePasswordProps {
  show: boolean;
  handleClose?: () => void;
  onSuccess?: () => void;
}

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    ?.required('Your password must be at least 8 characters')
    .matches(
      config.validate.validatePassword(),
      'Your password must be at least 8 characters long with one letter, and a number',
    ),
  newPassword: Yup.string()
    ?.required('Please Enter new password')
    .matches(
      config.validate.validatePassword(),
      'Your password must be at least 8 characters long with one letter, and a number',
    ),
  confirmNewPassword: Yup.string()
    ?.required('Please Enter confirm password')
    .oneOf([Yup.ref('newPassword'), null], 'Confirm password does not match with New Password')
    .matches(
      config.validate.validatePassword(),
      'Your password must be at least 8 characters long with one letter, and a number',
    ),
});

export const ModalChangePassword: React.FC<ModalChangePasswordProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = (values: { password: string; newPassword: string; confirmNewPassword: string }) => {
    const bodyData: any = {
      old_password: values?.password,
      new_password: values?.newPassword,
    };

    setLoading(true);
    callApi(
      {
        method: 'put',
        api: config.rest.changeAdminPassword(),
        body: bodyData,
      },
      (response: any) => {
        setLoading(false);
        const { status } = response;
        if (status === SUCCESS) {
          onCloseModal();
          clearLS();
          history.push('/admin/sign-in');
        }
      },
    );
  };

  const [isFetching] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    newPassword: boolean;
    confirmNewPassword: boolean;
  }>({
    password: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const ref = useRef<any>(null);

  const onCloseModal = () => {
    props?.handleClose?.();
    ref?.current?.resetForm?.();
  };

  return (
    <div className="flex-row align-items-center">
      <CModal
        size="lg"
        centered
        show={props.show}
        onClose={onCloseModal}
        onClosed={onCloseModal}
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>Change password</CModalHeader>
        <CModalBody>
          <CRow className="justify-content-center">
            <CCol md="12">
              <CCardGroup>
                <CCard>
                  <CCardBody>
                    <Formik
                      innerRef={ref}
                      enableReinitialize={true}
                      initialValues={{
                        password: '',
                        newPassword: '',
                        confirmNewPassword: '',
                      }}
                      onSubmit={onSubmit}
                      validationSchema={ChangePasswordSchema}
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
                        setFieldValue,
                        setFieldTouched,
                      }) => (
                        <CForm onSubmit={handleSubmit}>
                          <CFormGroup>
                            <CLabel>Old Password</CLabel>
                            <CInputGroup>
                              <CInput
                                name="password"
                                autoFocus
                                type={showPassword?.password ? 'text' : 'password'}
                                value={values.password}
                                onChange={(e) => {
                                  const target = e.target as HTMLTextAreaElement;
                                  if (!target.value.includes(' ')) handleChange(e);
                                }}
                                invalid={touched.password && !!errors.password}
                                maxLength={16}
                                onBlur={handleBlur}
                              />
                              <CInputGroupPrepend
                                onClick={() => {
                                  setShowPassword({
                                    ...showPassword,
                                    password: !showPassword.password,
                                  });
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <CInputGroupText>
                                  <CIcon name={showPassword.password ? 'cil-lock-locked' : 'cil-lock-unlocked'} />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInvalidFeedback>{errors.password}</CInvalidFeedback>
                            </CInputGroup>
                            {/* {errors?.password && touched.password && <ErrorMessage>{errors?.password}</ErrorMessage>} */}
                          </CFormGroup>

                          <CFormGroup>
                            <CLabel>New Password</CLabel>
                            <CInputGroup>
                              <CInput
                                name="newPassword"
                                autoFocus
                                type={showPassword?.newPassword ? 'text' : 'password'}
                                value={values.newPassword}
                                onChange={(e) => {
                                  const target = e.target as HTMLTextAreaElement;
                                  if (!target.value.includes(' ')) handleChange(e);
                                }}
                                invalid={touched.newPassword && !!errors.newPassword}
                                maxLength={16}
                                onBlur={handleBlur}
                              />
                              <CInputGroupPrepend
                                onClick={() => {
                                  setShowPassword({
                                    ...showPassword,
                                    newPassword: !showPassword.newPassword,
                                  });
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <CInputGroupText>
                                  <CIcon name={showPassword.newPassword ? 'cil-lock-locked' : 'cil-lock-unlocked'} />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                            </CInputGroup>
                            {errors?.newPassword && touched.newPassword && (
                              <ErrorMessage>{errors?.newPassword}</ErrorMessage>
                            )}
                          </CFormGroup>

                          <CFormGroup>
                            <CLabel>Confirm Password</CLabel>
                            <CInputGroup>
                              <CInput
                                name="confirmNewPassword"
                                autoFocus
                                type={showPassword?.confirmNewPassword ? 'text' : 'password'}
                                value={values.confirmNewPassword}
                                onChange={(e) => {
                                  const target = e.target as HTMLTextAreaElement;
                                  if (!target.value.includes(' ')) handleChange(e);
                                }}
                                invalid={touched.confirmNewPassword && !!errors.confirmNewPassword}
                                maxLength={16}
                                onBlur={handleBlur}
                              />
                              <CInputGroupPrepend
                                onClick={() => {
                                  setShowPassword({
                                    ...showPassword,
                                    confirmNewPassword: !showPassword.confirmNewPassword,
                                  });
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <CInputGroupText>
                                  <CIcon
                                    name={showPassword.confirmNewPassword ? 'cil-lock-locked' : 'cil-lock-unlocked'}
                                  />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                            </CInputGroup>
                            {errors?.confirmNewPassword && touched.confirmNewPassword && (
                              <ErrorMessage>{errors?.confirmNewPassword}</ErrorMessage>
                            )}
                          </CFormGroup>
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {/* <CButton
                              onClick={onCloseModal}
                              disabled={isFetching}
                              color="danger"
                              style={{ width: 100, marginRight: spacing[3] }}
                            >
                              Cancel
                            </CButton> */}
                            <CButton
                              disabled={!(isValid && dirty && !loading)}
                              color="primary"
                              className="px-4"
                              style={{ width: 100 }}
                              type="submit"
                            >
                              {loading ? <CSpinner size="sm" color="light" /> : 'Update'}
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
