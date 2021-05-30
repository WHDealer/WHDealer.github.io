import React, { useEffect, useRef, useState } from 'react';
import {
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
  CInvalidFeedback,
  CFormGroup,
  CTextarea,
  CModalFooter,
} from '@coreui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { capitalizeWords, validate } from '../../../utils';
import config from '../../../config';
import { SUCCESS } from '../../../store/callApi/actions';
import { CModal } from '../../../components';
import { useDispatch } from 'react-redux';
import { loadingRequest, loadingSuccess } from '../../../store/loading/actions';
import FieldName from '../containers/FieldName';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { ls } from '../../../extensions';
import ProgressBar from '@ramonak/react-progress-bar';
import { colors } from '../../../theme';
import Dropzone from 'react-dropzone';
import './ModalTrainer.scss';
import upload from './upload.png';
import ReactLoading from 'react-loading';
import GlobalEvent from 'js-events-listener';
import { createToast } from '../../../store/toasts/actions';

const validationSchema = function (values: any) {
  return Yup.object().shape({
    first_name: Yup.string().trim().required('Trainer First Name is required'),
    last_name: Yup.string().trim().required('Trainer Last Name is required'),
    intro_video: Yup.string().trim().required('Intro Video is required'),
  });
};

interface Props {
  type: 'create' | 'update';
  show: boolean;
  handleClose: () => void;
  initialValues: any;
  callApi: any;
  searchTrainers: () => void;
  trainers: any;
  uploadingVideos: any;
  setUploadingVideos: any;
}

let cancelTokenSource: any;

const ModalTrainer: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const { type, show, initialValues, searchTrainers, callApi, trainers, uploadingVideos, setUploadingVideos } = props;
  const [avatar, setAvatar] = useState<any>('');
  const [video, setVideo] = useState({ trainerId: '', link: '', localLink: '' });
  const [fileErrorMsg, setFileErrorMsg] = useState('');
  const dispatch = useDispatch();

  const formRef = useRef<any>(null);

  const getTemporaryUploadLinkVideo = (selectedVideoFile: any) => {
    const file: File = (selectedVideoFile as FileList)[0];
    const videoFileNameSplit = file?.name.split('.');
    const videoFileName = 'video.' + videoFileNameSplit[videoFileNameSplit.length - 1];

    callApi(
      {
        method: 'get',
        loading: true,
        api: `/api/v1/upload/trainer?file_name=${videoFileName}${
          type === 'update' ? `&trainer_id=${initialValues.id}` : ''
        }`,
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setVideo((video) => {
            return { ...video, trainerId: data.trainer_id, link: data.link };
          });
          uploadFile(data.link, file, data.trainer_id);
          saveVideoIdUploading(data.trainer_id);
          formRef?.current?.setFieldValue(
            'intro_video',
            `https://d3rp9m7rwb80du.cloudfront.net/videos/trainer/${data.trainer_id}/video/video_hls/video.m3u8`,
          );
        }
      },
    );
  };

  useEffect(() => {
    const handleVideoStatusEvent: any = GlobalEvent.on(config.socketEvent.processedTrainerIntro, (message: any) => {
      const trainerId = message?.data?.trainer_id?.split('/')?.[0];
      if (trainers.findIndex((item: any) => item.id === trainerId) !== -1) searchTrainers();
      // console.log(message, trainerId, video.trainerId, initialValues.id);
      if (trainerId === video.trainerId || trainerId === initialValues.id)
        formRef?.current?.setFieldValue?.('intro_video_status', 'Posted');
      dispatch(createToast('Intro video has been successfully processed', 'success', 5000));
    });
    return () => {
      GlobalEvent.rm(handleVideoStatusEvent);
    };
  }, [video.trainerId, initialValues.id]);

  const uploadFile = (link: string, file: any, videoId: any) => {
    var myHeaders = new Headers();
    myHeaders.append('x-amz-acl', 'public-read');

    setUploadingVideos((items: any) => {
      return [...items, { id: videoId, progress: 0 }];
    });

    var instance = axios.create();
    delete instance.defaults.baseURL;
    delete instance.defaults.headers.common['Authorization'];
    cancelTokenSource = axios.CancelToken.source();

    var config: any = {
      method: 'put',
      url: link,
      headers: {
        'x-amz-acl': 'public-read',
        'Content-Type': file?.type,
      },
      data: file,
      onUploadProgress: (progressEvent: ProgressEvent) => {
        setUploadingVideos((uploadingVideos: any) => {
          const newUploadingVideos = [...uploadingVideos];
          const index = newUploadingVideos.findIndex((item: any) => item.id === videoId);
          if (index > -1) {
            newUploadingVideos[index].progress = Math.round((100 * progressEvent.loaded) / progressEvent.total);
            return newUploadingVideos;
          }
          return newUploadingVideos;
        });
      },
      cancelToken: cancelTokenSource.token,
    };

    instance(config)
      .then(function (response) {
        removeVideoIdUploaded(videoId);
        // console.log(JSON.stringify(response));
        setUploadingVideos((items: any) => {
          return items.filter((item: any) => item.id !== videoId);
        });
        // onSuccess(videoId);
        formRef.current?.setFieldValue('intro_video_status', 'Processing');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const saveVideoIdUploading = (videoId: any) => {
    let videosUploading = JSON.parse(ls.get('videosUploading')) || [];
    videosUploading.push(videoId);
    ls.set('videosUploading', JSON.stringify(videosUploading));
  };

  const removeVideoIdUploaded = (videoId: any) => {
    let videosUploading = ls.get('videosUploading');
    let videoArr: any = JSON.parse(videosUploading);
    let newVideoArr = videoArr.filter((videoItem: any) => videoItem !== videoId);
    ls.set('videosUploading', JSON.stringify(newVideoArr));
  };

  const onSubmit = (values: {
    first_name: string;
    last_name: string;
    description: string;
    intro_video: string;
    intro_video_status: string;
  }) => {
    const body = {
      id: video.trainerId,
      avatar,
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      description: values.description.trim(),
      intro_video: values.intro_video,
      intro_video_status: 'Posted',
    };
    callApi(
      {
        method: type === 'create' ? 'post' : 'put',
        api: config.rest.adminMobilityTrainer(initialValues.id),
        body,
        loading: true,
      },
      ({ status }: any) => {
        if (status === SUCCESS) {
          searchTrainers();
        }
      },
    );
    newHandleClose();
  };

  const [attention, setAttention] = useState(false);

  const newHandleClose = () => {
    setVideo({ trainerId: '', link: '', localLink: '' });
    formRef.current.setFieldValue('intro_video', null);
    formRef.current.setFieldValue('intro_video_status', null);
    cancelTokenSource?.cancel?.('Upload cancelled');
    setUploadingVideos((items: any) => {
      return items.filter((item: any) => item.id !== video.trainerId);
    });
    formRef.current.resetForm();
    props.handleClose();
    setAttention(false);
  };

  const showAttention = () => {
    if (!formRef.current.dirty && avatar === initialValues.avatar) {
      newHandleClose();
      return;
    }
    setAttention(true);
  };

  useEffect(() => {
    if (!show) return;
    setAvatar(initialValues.avatar);
    formRef?.current?.resetForm();
    // formRef?.current?.setFieldValue('intro_video_status', null);
  }, [show]);

  const uploadAvatar = (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) return;

    let link_api = '';
    let link_avatar = '';

    reader.onload = () => {
      setAvatar(reader.result);
      dispatch(loadingRequest());
      callApi(
        {
          method: 'get',
          api: `/api/v1/upload/image-trainer-avatar?file_name=${file.name}`,
        },
        (response: any) => {
          if (response.status === SUCCESS) {
            link_api = response?.data?.link;
            link_avatar = response?.data?.file_path?.link;
            let myHeaders = new Headers();
            myHeaders.append('x-amz-acl', 'public-read');
            const requestOptions: any = {
              method: 'PUT',
              headers: myHeaders,
              body: file,
              redirect: 'follow',
            };
            fetch(link_api, requestOptions)
              .then((response) => response.text())
              .then(() => {
                dispatch(loadingSuccess());
                setAvatar(link_avatar);
              })
              .catch((error) => console.log('error', error));
          } else {
            dispatch(loadingSuccess());
          }
        },
      );
    };
    reader.readAsDataURL(file);
  };

  const uploadRef = useRef<any>(null);

  const uploadingVideo = uploadingVideos.filter((item: any) => item.id === video.trainerId)?.[0];

  return (
    <CModal size="lg" centered show={show} onClose={newHandleClose} closeOnBackdrop={false}>
      <CModalHeader>
        {type === 'create' ? 'Create New Trainer' : 'Edit Trainer Information'}
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
                    validate={validate(validationSchema)}
                    onSubmit={onSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      dirty,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isValid,
                      setFieldValue,
                      setFieldTouched,
                    }) => (
                      <CForm onSubmit={handleSubmit}>
                        <div className="d-flex">
                          <FieldName label="Avatar (*)" centered>
                            <div
                              style={{ position: 'relative', margin: '12px 80px 16px 60px', width: 128, height: 128 }}
                            >
                              <img
                                src={avatar || 'https://i.imgur.com/b08hxPY.png'}
                                alt="avatar"
                                style={{
                                  borderRadius: 100,
                                  objectFit: 'cover',
                                  width: '100%',
                                  height: '100%',
                                }}
                              />
                              <div
                                onClick={() => uploadRef.current?.click()}
                                style={{
                                  position: 'absolute',
                                  bottom: 0,
                                  right: 0,
                                  backgroundColor: '#ddd',
                                  width: 40,
                                  height: 40,
                                  borderRadius: 20,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <i className="fas fa-camera" />
                              </div>
                              <input
                                className="avatar-user--input"
                                type="file"
                                id="myFile"
                                name="filename"
                                ref={uploadRef}
                                style={{ display: 'none' }}
                                accept="image/x-png,image/gif,image/jpeg"
                                onChange={uploadAvatar}
                              />
                            </div>
                          </FieldName>
                          <div
                            style={{
                              height: 240,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              flex: 1,
                            }}
                          >
                            {values?.intro_video ? (
                              <div className="admin-drag-container" style={{ backgroundColor: colors.gray3 }}>
                                {show && (
                                  <ReactPlayer
                                    url={video.localLink || values?.intro_video}
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                  />
                                )}
                                {values?.intro_video && (
                                  <i
                                    onClick={() => {
                                      cancelTokenSource?.cancel?.('Upload cancelled');
                                      setFieldValue('intro_video', null);
                                      setFieldValue('intro_video_status', null);
                                      setUploadingVideos((items: any) => {
                                        return items.filter((item: any) => item.id !== video.trainerId);
                                      });
                                    }}
                                    style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                    className="fas fa-times-circle fa-2x"
                                  ></i>
                                )}
                              </div>
                            ) : (
                              <Dropzone
                                accept=".mp4,.wmv,.flv,.mov,.avi"
                                maxFiles={1}
                                maxSize={5e9}
                                onDropRejected={(fileRejected) => {
                                  setFileErrorMsg(fileRejected[0].errors[0].message || '');
                                }}
                                onDropAccepted={(acceptedFiles: any) => {
                                  const file: File = (acceptedFiles as FileList)[0];
                                  getTemporaryUploadLinkVideo(acceptedFiles);
                                  setFieldValue('title', file?.name?.substr(0, file?.name?.lastIndexOf('.')) || '');
                                  setTimeout(() => {
                                    setFieldTouched('title');
                                  });
                                  setFieldValue('intro_video_status', 'Uploading');
                                  setFileErrorMsg('');
                                  setVideo((video) => {
                                    return { ...video, localLink: URL.createObjectURL(file) };
                                  });
                                }}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <div
                                    className="admin-drag-container"
                                    style={{ cursor: 'pointer' }}
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <img
                                      src={upload}
                                      style={{ width: 32, height: 32, margin: '50px 0 12px', opacity: 0.5 }}
                                    />
                                    <div style={{ fontWeight: 'bold', color: 'black', opacity: 0.5 }}>
                                      Upload Intro Video
                                    </div>
                                    {fileErrorMsg && (
                                      <div className="admin-file-error-container">
                                        <i style={{ color: colors.error }} className="fas fa-exclamation-triangle"></i>
                                        <div className="admin-file-error-msg-text">{fileErrorMsg}</div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Dropzone>
                            )}
                            <div
                              className="d-flex justify-content-center"
                              style={{ position: 'relative', height: 20, width: 300 }}
                            >
                              {!!uploadingVideo && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: 15,
                                    borderRadius: 100,
                                    overflow: 'hidden',
                                    width: '100%',
                                  }}
                                >
                                  <ProgressBar
                                    completed={uploadingVideo?.progress}
                                    height={'15px'}
                                    baseBgColor={colors.palette.lightBlue}
                                    bgColor={colors.blue}
                                    transitionDuration={'0.5s'}
                                    transitionTimingFunction={'linear'}
                                  />
                                </div>
                              )}
                              {values?.intro_video_status === 'Processing' && (
                                <div style={{ position: 'absolute', top: -20 }}>
                                  <ReactLoading type="bubbles" color="var(--primary)" width={80} />
                                </div>
                              )}
                              {values?.intro_video_status === 'Posted' && video.localLink && (
                                <div style={{ position: 'absolute', top: 6, fontSize: 15 }}>
                                  <div>Video is processed</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <FieldName label="First Name (*)">
                          <CFormGroup className="m-0">
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
                          </CFormGroup>
                        </FieldName>
                        <FieldName label="Last Name (*)">
                          <CFormGroup className="m-0">
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
                          </CFormGroup>
                        </FieldName>
                        <FieldName label="Description">
                          <CFormGroup className="m-0">
                            <CTextarea
                              type="text"
                              placeholder="Description"
                              maxLength={1000}
                              value={values.description}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="description"
                              rows={5}
                            />
                          </CFormGroup>
                        </FieldName>
                        <CFormGroup className="mb-0">
                          <CRow>
                            <CCol xs="12" style={{ textAlign: 'right' }}>
                              <CButton color="secondary" className="px-4 mr-4" onClick={showAttention}>
                                {t('cancel')}
                              </CButton>
                              <CButton
                                color="primary"
                                className="px-4"
                                type="submit"
                                disabled={!avatar || !isValid || (!dirty && avatar === initialValues.avatar)}
                              >
                                {type === 'create' ? 'Create' : 'Save'}
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
      </CModalBody>
    </CModal>
  );
};

export default ModalTrainer;
