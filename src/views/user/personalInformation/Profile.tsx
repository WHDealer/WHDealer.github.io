import React, { useRef, useState, useEffect, forwardRef } from 'react';
import {
  CRow,
  CCardBody,
  CCardHeader,
  CCard,
  CCol,
  CFormGroup,
  CForm,
  CInvalidFeedback,
  CInput,
  CSpinner,
} from '@coreui/react';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../store/auth/actions';
import { addUserLS, capitalizeWords, formatDate } from '../../../utils';
import styles from './Profile.module.scss';
import { HBButton, HBButtonFull, HBButtonSmall, HBModalConfirm } from '../../../hbBaseClass';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { validate, createDate } from '../../../utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { defaultAvatar } from '../../../extensions';

interface Props {
  location: any;
}

const CustomInput = forwardRef(({ onClick }: any, ref: any) => {
  return (
    <div className={styles.iconDate} onClick={onClick} ref={ref}>
      <i className="hb-icon-calendar-date"></i>
    </div>
  );
});

const validationSchema = function () {
  return Yup.object().shape({
    first_name: Yup.string().trim().required('First Name is required'),
    last_name: Yup.string().trim().required('Last Name is required'),
  });
};

const Profile: React.FC<Props> = (props) => {
  const auth = useSelector((state: any) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));
  const uploadRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any>(null);
  const [temporaryUploadLink, setTemporaryUploadLink] = useState<any>({
    file_path: '',
    link: '',
  });
  const [avatar, setAvatar] = useState<any>({
    file: '',
    imagePreviewUrl: '',
    avatar: auth?.avatar || '',
    loading: false,
  });
  const [isUpdate, setIsUpdate] = useState<any>(false);
  const [gender, setGender] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<any>(null);
  const groupName = useSelector((state: any) => state.auth.group_name);
  const [show, setShow] = useState(false);

  // Get Profile For Nurse and User
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
          const newDate = createDate(data.birth_date);
          setData({ ...data, birth_date: newDate });
          setGender(data.gender);
          setDateOfBirth(newDate);
        }
      },
    );
  };

  // Get Link Upload S3
  const getTemporaryUploadLink = () => {
    callApi(
      {
        method: 'get',
        api: config.rest.getUploadLink('image'),
      },
      (response: any) => {
        if (response.status === SUCCESS) {
          setTemporaryUploadLink(response?.data || {});
        }
      },
    );
  };

  const onSubmit = (values: any) => {
    const newDate = formatDate(dateOfBirth);
    const body = {
      gender,
      phone_number: values.phone_number,
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      birth_date: newDate,
      bio: values.bio,
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
          setIsUpdate(false);
          setData((data: any) => {
            const newUser = {
              gender,
              phone_number: values.phone_number,
              first_name: values.first_name.trim(),
              last_name: values.last_name.trim(),
              birth_date: newDate,
            };
            addUserLS(newUser);
            dispatch(updateProfile(newUser));
            return {
              ...data,
              ...body,
              birth_date: dateOfBirth,
            };
          });
        }
      },
    );
  };

  const uploadAvatar = (link: string, fileInput: any) => {
    let myHeaders = new Headers();
    myHeaders.append('x-amz-acl', 'public-read');

    let file = fileInput;
    avatar.loading = true;
    const requestOptions: any = {
      method: 'PUT',
      headers: myHeaders,
      body: file,
      redirect: 'follow',
    };

    fetch(link, requestOptions)
      .then((response) => response.text())
      .then((response: any) => {
        console.log(response);
        addUserLS({ avatar: temporaryUploadLink?.avatar });
        setAvatar((avatar: any) => {
          return { ...avatar, loading: false };
        });
        dispatch(updateProfile({ avatar: temporaryUploadLink?.avatar }));
        avatar.loading = false;
      })
      .catch((error) => console.log('error', error));
  };

  const onUploadAvatar = (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) return;

    reader.onload = () => {
      setTemporaryUploadLink({ file_path: file });
      setAvatar({ file: file, imagePreviewUrl: reader.result, loading: true });
      uploadAvatar(temporaryUploadLink.link, file);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleClose = () => {
    setShow(!show);
  };

  const formRef = useRef<any>(null);

  if (!data) return <div />;

  const isValidMore = groupName === 'nurse' ? gender !== 3 && dateOfBirth : true;

  return (
    <>
      <HBModalConfirm
        show={show}
        handleClose={handleClose}
        title="Abbrechen"
        content="Sind sie sicher, dass sie Abbrechen wollen? Alle Änderungen gehen dabei verloren."
        up="Ja, abbrechen"
        upCallback={() => {
          formRef.current.resetForm();
          setIsUpdate(false);
          setShow(false);
        }}
        down="Weiter bearbeiten"
        downCallback={handleClose}
      />
      <div className={`wide ${styles.profileWrapper}`}>
        <h1 className={styles.title}>Profil</h1>
        <CRow className={styles.profileContainer}>
          <CCol md={4}>
            <div className={styles.leftWrapper}>
              <div className={styles.userName}>
                <p>{data.first_name}</p>
                <p>{data.last_name}</p>
              </div>
              <div className={styles.avatarArea}>
                <div
                  className={styles.avatarUser}
                  style={{
                    backgroundImage: `url("${
                      (avatar.imagePreviewUrl ? avatar.avatar || avatar.imagePreviewUrl : data.avatar_thumbnail) ||
                      defaultAvatar
                    }")`,
                  }}
                >
                  <div
                    className={styles.overlay}
                    style={{
                      backgroundColor: avatar.loading ? '#fff4' : 'transparent',
                    }}
                  >
                    <div className={styles.avatarLoading}>
                      {avatar.loading ? (
                        <CSpinner style={{ color: 'var(--aquamarin-100)', borderWidth: 4 }} size="lg" />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <HBButton
                  className={styles.avatarUserButtonWrapper}
                  btnClassName={styles.avatarUserButton}
                  onClick={() => {
                    uploadRef.current?.click();
                    getTemporaryUploadLink();
                  }}
                  color="petrol"
                >
                  Foto aktualisieren
                </HBButton>
                <input
                  className="avatar-user--input"
                  type="file"
                  id="myFile"
                  name="filename"
                  ref={uploadRef}
                  style={{ display: 'none' }}
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={onUploadAvatar}
                />
              </div>
            </div>
          </CCol>
          <CCol md={8}>
            <CCard className={`hb-card ${styles.formContainer}`}>
              <CCardBody className="hb-card-item" style={{ marginBottom: 0 }}>
                <Formik
                  innerRef={formRef}
                  initialValues={data}
                  enableReinitialize={true}
                  validate={validate(validationSchema)}
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
                    <CForm className={styles.form} onSubmit={handleSubmit}>
                      <CFormGroup className={styles.lastFormGroup}>
                        <div className={styles.wrapperTitle}>
                          <div className={styles.cardTitle}>Persönliche Daten</div>
                          <HBButton
                            btnClassName={styles.btnSubmit}
                            className={styles.wrapperBtn}
                            onClick={() => {
                              setIsUpdate(true);
                              formRef.current.resetForm();
                              setGender(data.gender);
                              setDateOfBirth(data.birth_date);
                            }}
                            type="button"
                            style={{ display: isUpdate ? 'none' : 'flex' }}
                          >
                            Daten bearbeiten
                          </HBButton>
                        </div>
                      </CFormGroup>

                      {!isUpdate && (
                        <CFormGroup className={`${styles.bioWrapper}`}>
                          {data.bio ? (
                            <CCard className={styles.modalBody}>
                              <CCardHeader className={styles.modalBioTitle}>
                                <div>Biografie</div>
                                <i className="hb-icon-pentool-2"></i>
                              </CCardHeader>
                              <CCardBody className={styles.mobdalBioBody}>
                                {data.bio}
                                <HBButton
                                  btnClassName={styles.btnEdit}
                                  className={styles.wrapperBtn}
                                  onClick={() => history.push('/update-bio')}
                                  type="button"
                                >
                                  Bearbeiten
                                </HBButton>
                              </CCardBody>
                            </CCard>
                          ) : (
                            <div className={styles.btnNurse} onClick={() => history.push('/update-bio')}>
                              <div className={styles.contentNurse}>
                                <div className={styles.uploadDocument}>
                                  <i className="hb-icon-book"></i>
                                </div>
                                <span>Biografie hinzufügen</span>
                              </div>
                              <div className={styles.iconArrowNurse}>
                                <i className="hb-icon-arrow-right"></i>
                              </div>
                            </div>
                          )}

                          <CInvalidFeedback>{errors.bio || ''}</CInvalidFeedback>
                        </CFormGroup>
                      )}

                      <CFormGroup className={styles.genderGroup}>
                        <div className={styles.label} style={{ display: data.gender === 3 ? 'none' : 'block' }}>
                          Geschlecht{isUpdate && groupName === 'nurse' && '*'}
                        </div>
                        {!isUpdate ? (
                          <HBButtonSmall
                            disabled
                            light
                            type="button"
                            style={{ display: data.gender === 3 ? 'none' : 'block' }}
                          >
                            {data.gender === 0 ? 'Männlich' : data.gender === 1 ? 'Weiblich' : 'Andere'}
                          </HBButtonSmall>
                        ) : (
                          <div className={styles.gender}>
                            <HBButtonSmall
                              type="button"
                              color="petrol"
                              onClick={() => setGender(1)}
                              className={`${styles.btnGender} ${gender === 1 ? 'is-selected' : ''}`}
                            >
                              Weiblich
                            </HBButtonSmall>
                            <HBButtonSmall
                              type="button"
                              color="petrol"
                              onClick={() => setGender(0)}
                              className={`${styles.btnGender} ${gender === 0 ? 'is-selected' : ''}`}
                            >
                              Männlich
                            </HBButtonSmall>
                            <HBButtonSmall
                              type="button"
                              color="petrol"
                              onClick={() => setGender(2)}
                              className={`${styles.btnGender} ${gender === 2 ? 'is-selected' : ''}`}
                            >
                              Andere
                            </HBButtonSmall>
                          </div>
                        )}
                      </CFormGroup>

                      <CFormGroup className={[styles.formGroup, styles.email]}>
                        <div className={styles.label}>Email</div>

                        <CInput
                          type="text"
                          placeholder="E-Mail Adresse"
                          autoComplete="email"
                          // invalid={values.email !== '' && touched.email && !!errors.email}
                          name="email"
                          maxLength={50}
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={(e: any) => {
                            if (!e.target.value.includes(' ')) handleChange(e);
                          }}
                          className={styles.inputText}
                          disabled
                        />
                        <CInvalidFeedback>{errors.email || ''}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup className={[styles.formGroup, styles.dataOfBirth]}>
                        <div className={styles.label}>Geburtstag{isUpdate && groupName === 'nurse' && '*'}</div>
                        {!isUpdate ? (
                          <CInput
                            type="text"
                            placeholder="TT.MM.JJJJ"
                            autoComplete="birth_date"
                            // invalid={values.birth_date !== '' && touched.birth_date && !!errors.birth_date}
                            name="birth_date"
                            value={data.birth_date ? moment(data.birth_date).format('DD.MM.YYYY') || '' : 'TT.MM.JJJJ'}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              if (!e.target.value.includes(' ')) handleChange(e);
                            }}
                            className={styles.inputText}
                            disabled
                          />
                        ) : (
                          <div className={styles.date}>
                            <div className={isUpdate ? styles.valueDate : styles.valueDateDisable}>
                              {dateOfBirth ? moment(dateOfBirth || data.birth_date).format('DD.MM.YYYY') : 'TT.MM.JJJJ'}
                            </div>
                            <div style={{ width: 50 }} className={`hb-datepicker`}>
                              <DatePicker
                                selected={dateOfBirth}
                                customInput={<CustomInput />}
                                onChange={(date: any) => setDateOfBirth(date)}
                                yearDropdownItemNumber={40}
                                showYearDropdown
                                showMonthDropdown
                                scrollableYearDropdown
                                adjustDateOnChange
                                withPortal
                                maxDate={new Date()}
                                popperPlacement="top-end"
                                disabled={!isUpdate}
                              />
                            </div>
                          </div>
                        )}

                        <CInvalidFeedback>{errors.birth_date || ''}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup className={[isUpdate ? styles.formGroup : '', styles.phone]}>
                        <div className={styles.label}>Telefonnummer</div>
                        <CInput
                          type="text"
                          placeholder="Telefonnummer"
                          autoComplete="phone_number"
                          // invalid={values.phone_number !== '' && touched.phone_number && !!errors.phone_number}
                          name="phone_number"
                          value={values.phone_number || ''}
                          onBlur={handleBlur}
                          onChange={(e: any) => {
                            if (!e.target.value || config.validate.valueTypingExpressionsPhone(e)) handleChange(e);
                          }}
                          maxLength={20}
                          className={styles.inputText}
                          disabled={!isUpdate}
                        />
                        <CInvalidFeedback>{errors.phone_number || ''}</CInvalidFeedback>
                      </CFormGroup>

                      {isUpdate && (
                        <>
                          <CFormGroup className={styles.formGroup}>
                            <div className={styles.label}>Vorname*</div>
                            <CInput
                              type="text"
                              placeholder="Vorname"
                              invalid={values.first_name.trim() !== '' && touched.first_name && !!errors.first_name}
                              autoComplete="first_name"
                              maxLength={50}
                              value={capitalizeWords(values.first_name || '')}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                              }}
                              name="first_name"
                              className={styles.inputText}
                              required
                              disabled={!isUpdate}
                            />

                            <CInvalidFeedback>{errors.first_name}</CInvalidFeedback>
                          </CFormGroup>
                          <CFormGroup>
                            <div className={styles.label}>Nachname*</div>
                            <CInput
                              type="text"
                              placeholder="Nachname"
                              invalid={values.last_name.trim() !== '' && touched.last_name && !!errors.last_name}
                              autoComplete="last_name"
                              maxLength={50}
                              value={capitalizeWords(values.last_name || '')}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                if (config.validate.valueTypingExpressionsName(e)) handleChange(e);
                              }}
                              name="last_name"
                              className={styles.inputText}
                              required
                              disabled={!isUpdate}
                            />

                            <CInvalidFeedback>{errors.last_name}</CInvalidFeedback>
                          </CFormGroup>
                          <div className={styles.btnGroupWrap}>
                            <div style={{ width: 124, height: 51, marginTop: 30 }}>
                              <HBButtonFull
                                type="button"
                                outline
                                onClick={() => {
                                  if (!dirty && gender === data.gender && dateOfBirth === data.birth_date)
                                    setIsUpdate(false);
                                  else setShow(true);
                                }}
                              >
                                Abbrechen
                              </HBButtonFull>
                            </div>
                            <div style={{ width: 124, height: 51, marginTop: 30 }}>
                              <HBButtonFull
                                type="submit"
                                disabled={
                                  !isValid ||
                                  !isValidMore ||
                                  loading ||
                                  (!dirty && gender === data.gender && dateOfBirth === data.birth_date)
                                }
                              >
                                {loading ? <CSpinner color="light" size="sm" /> : 'Speichern'}
                              </HBButtonFull>
                            </div>
                          </div>
                        </>
                      )}
                    </CForm>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  );
};

export default Profile;
