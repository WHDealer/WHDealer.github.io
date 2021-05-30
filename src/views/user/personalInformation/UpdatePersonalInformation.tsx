import React, { useEffect, useState } from 'react';
import { CTextarea, CForm, CFormGroup, CInvalidFeedback, CContainer, CCard, CCardBody } from '@coreui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styles from './Profile.module.scss';
import { HBButtonFull, HBModalConfirm } from '../../../hbBaseClass';

const UpdatePersonalInformation: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const [data, setData] = useState<any>(null);
  const history = useHistory();
  const [show, setShow] = useState(false);

  const validationSchema = function (values: any) {
    return Yup.object().shape({
      bio: Yup.string().trim().required(),
    });
  };

  const getProfile = () => {
    callApi(
      {
        method: 'get',
        api: config.rest.getProfileUser(),
        loading: true,
      },
      (response: any) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setData(data);
          setBio(data.bio);
        }
      },
    );
  };

  const initialValues = {
    bio: bio,
  };

  const onSubmit = (values: any) => {
    const body = {
      gender: data.gender,
      phone_number: data.phone_number,
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      birth_date: data.birth_date,
      bio: values.bio.trim(),
    };

    setLoading(true);
    callApi(
      {
        method: 'put',
        api: config.rest.editProfile(),
        body: body,
        msg: config.messages.updateMessageFailure,
      },
      (response: any) => {
        const { status } = response;
        setLoading(false);
        if (status === SUCCESS) {
          history.push('/profile');
        }
      },
    );
  };

  const ref = useRef<any>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const handleClose = () => {
    setShow(!show);
  };

  return (
    <div className={styles.changePasswordUser}>
      <HBModalConfirm
        show={show}
        handleClose={handleClose}
        title=""
        content="Sind sie sicher, dass sie Abbrechen wollen? Alle Änderungen gehen dabei verloren."
        up="Ja, abbrechen"
        upCallback={() => history.push('/profile')}
        down="Weiter bearbeiten"
        downCallback={handleClose}
      />
      <CContainer className={styles.bioContainer}>
        <div className={`hb-title ${styles.title} ${styles.bioTitle}`}>Biografie hinzufügen</div>
        <CCard className={styles.cardWrapper}>
          <CCardBody className={styles.cardBody}>
            <Formik innerRef={ref} enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit}>
              {({
                values,
                errors,
                touched,
                //status,
                dirty,
                handleChange,
                handleBlur,
                handleSubmit,
                //isSubmitting,
                isValid,
                // handleReset,
                // setTouched,
                // setFieldValue,
              }) => (
                <CForm onSubmit={handleSubmit}>
                  <CFormGroup>
                    <CTextarea
                      type="text"
                      placeholder="Biografie hinzufügen"
                      autoComplete="bio"
                      maxLength={500}
                      value={values.bio}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="bio"
                      rows={10}
                      className={styles.bio}
                      style={{ resize: 'none' }}
                    />
                  </CFormGroup>

                  <CFormGroup className={styles.btnWrapper}>
                    {/* <CRow>
                          <CCol xs="6">
                            <CButton
                              color="primary"
                              className="px-4"
                              type="submit"
                              disabled={!(isValid && dirty && !loading)}
                              style={{ width: 100 }}
                            >
                              {loading ? <CSpinner size="sm" color="light" /> : 'Update'}
                            </CButton>
                          </CCol>
                        </CRow> */}
                    <div className={styles.bioButton}>
                      <HBButtonFull
                        color="petrol"
                        outline
                        children="Abbrechen"
                        type="button"
                        onClick={() => {
                          if (values.bio === bio) {
                            return history.push('/profile');
                          } else setShow(true);
                        }}
                      />
                    </div>
                    <div className={styles.bioButton}>
                      <HBButtonFull
                        color="petrol"
                        children="Speichern"
                        type="submit"
                        disabled={!(isValid && dirty && !loading)}
                      />
                    </div>
                  </CFormGroup>
                </CForm>
              )}
            </Formik>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  );
};

export default UpdatePersonalInformation;
