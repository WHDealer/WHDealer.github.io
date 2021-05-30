import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react';
import { Formik } from 'formik';
import Switch from 'react-switch';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import styled from 'styled-components';
import * as Yup from 'yup';
import config from '../../../config';
import { ErrorMessage } from '../../../theme/styles';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import Dropzone from 'react-dropzone';
import { colors, spacing } from '../../../theme';
import axios from 'axios';
import { loadingRequest, loadingSuccess } from '../../../store/loading/actions';
import ProgressBar from '@ramonak/react-progress-bar';
import { ls } from '../../../extensions';
import ReactLoading from 'react-loading';
import { SelectLoadmore } from '../../../components';

interface ModalVideoFormProps {
  videoId: string;
  show: boolean;
  handleClose: () => void;
  type: 'create' | 'update';
  formValue: any;
  onSuccess: any;
  uploadingVideos: any;
  setUploadingVideos: any;
  videos: any;
  setVideos: any;
  satisfyFilter: any;
  auth: any;
  addNo: any;
}

let cancelTokenSource: any;

export const ModalVideoForm: React.FC<ModalVideoFormProps> = (props) => {
  const {
    show,
    handleClose,
    type,
    formValue,
    uploadingVideos,
    setUploadingVideos,
    videos,
    setVideos,
    satisfyFilter,
    auth,
    onSuccess,
    addNo,
  } = props;

  const [video, setVideo] = useState({ videoId: props.videoId, link: '' });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [fileErrorMsg, setFileErrorMsg] = useState('');
  const [uploadFirstTime, setUploadFirstTime] = useState(false);
  const [documentErrorMsg, setDocumentErrorMsg] = useState('');

  const [searchCategoryText, setSearchCategoryText] = useState('');
  const [categories, setCategories] = useState<any>({ data: [], loading: true, full: false, page: 1 });
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchTrainerText, setSearchTrainerText] = useState('');
  const [trainers, setTrainers] = useState<any>({ data: [], loading: true, full: false, page: 1 });
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);

  const VideoFormSchema = Yup.object().shape({
    title: Yup.string()?.trim()?.required(t('video-title-required')),
    posture_type: Yup.string()?.trim()?.required(t('video-title-required')),
  });

  const [tag, setTag] = useState<string>('');

  const ref = useRef<any>(null);

  const getMobilityCategories = (categoryName: string, page: number) => {
    callApi(
      {
        method: 'get',
        api: `/api/v1/admin/categories?page_size=80&search_name=${categoryName}&page_number=${page}`,
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setCategories((categories: any) => {
            const newCates = data.data.map((item: any) => {
              return { id: item.id, name: item.title };
            });
            const cates =
              page === 1 ? (categoryName === '' ? [null, ...newCates] : newCates) : [...categories.data, ...newCates];
            return { data: cates, loading: false, full: data.data.length < 10, page: page };
          });
        }
      },
    );
  };

  const getMobilityTrainers = (trainerName: string, page: number) => {
    callApi(
      {
        method: 'get',
        api: config.rest.adminGetMobilityTrainers(page, trainerName, true, true),
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setTrainers((trainers: any) => {
            const newUsers = data.trainers.map((item: any) => {
              return { id: item.id, name: item.first_name + ' ' + item.last_name };
            });
            const users =
              page === 1 ? (trainerName === '' ? [null, ...newUsers] : newUsers) : [...trainers.data, ...newUsers];
            return { data: users, loading: false, full: data.trainers.length < 10, page: page };
          });
        }
      },
    );
  };

  useEffect(() => {
    if (!show) return;

    setVideo({ ...video, videoId: props.videoId });
    getMobilityCategories('', 1);
    getMobilityTrainers('', 1);
    setSearchCategoryText(formValue.category_name);
    setSearchTrainerText(formValue.trainer_name);
    setSelectedCategory(formValue.category_id ? { id: formValue.category_id, name: formValue.category_name } : null);
    setSelectedTrainer(formValue.trainer_id ? { id: formValue.trainer_id, name: formValue.trainer_name } : null);
  }, [show]);

  const controller = new AbortController();
  const signal = controller.signal;

  signal.addEventListener('abort', () => {
    console.log(signal.aborted); // true
  });

  const getTemporaryUploadLinkVideo = (selectedVideoFile: any) => {
    const file: File = (selectedVideoFile as FileList)[0];
    const videoFileName = file?.name;

    callApi(
      {
        method: 'get',
        loading: true,
        api: config.rest.getTemporaryUploadLink(videoFileName),
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setVideo({
            videoId: data.video_id,
            link: data.link,
          });
          // if (satisfyFilter('Uploading', 'Non category')) {
          setVideos((videos: any) => {
            const newVideos = { ...videos };
            newVideos.data = [
              {
                id: data.video_id,
                thumbnail: '',
                hls_link: ref.current.values.video,
                name: '',
                description: '',
                status: 'Uploading',
                created_date: new Date().getTime() / 1000,
                modified_date: null,
                uploader: auth.first_name + ' ' + auth.last_name,
                tag: '',
                views: 0,
                comment: 0,
                like: 0,
                documents: [],
              },
              ...newVideos.data.slice(0, 9),
            ].map(addNo);
            return newVideos;
          });
          // }
          uploadFile(data.link, file, data.video_id);
          saveVideoIdUploading(data.video_id);
        }
      },
    );
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
    title: string;
    posture_type: string;
    description: string;
    category: string;
    tags: any;
    timeSchedule: any;
    video: any;
    id: any;
    documents: any;
    status: any;
    hls_link: string;
  }) => {
    if (type === 'create') {
      uploadMetaData(values, video.videoId);
    } else {
      uploadMetaData(values, values.id);
    }
  };

  const uploadDocuments = (arrayDocumentsFiles: any, documents: any = []) => {
    const files = Array.from(arrayDocumentsFiles).slice(0, 10 - documents.length);
    const promises = files?.map((file: any, fileIndex: any) =>
      getTemporaryUploadDocument(file?.name, type === 'create' ? video.videoId : formValue.id),
    );
    dispatch(loadingRequest());
    Promise.all(promises).then((documentResults: any) => {
      let countSuccess = 0;
      let documentMetaData: any = [];
      for (let i = 0; i < documentResults.length; i++) {
        if (documentResults[i]?.code === 200) {
          countSuccess = countSuccess + 1;
          documentMetaData.push(documentResults[i].data.file_path);
        } else {
          dispatch(loadingSuccess());
        }
      }
      if ((countSuccess = documentResults?.length)) {
        let countUploadDocumentSuccess = 0;

        for (let documentIndex = 0; documentIndex < files.length; documentIndex++) {
          let reader = new FileReader();

          reader.readAsDataURL(arrayDocumentsFiles[documentIndex]);

          var myHeaders = new Headers();
          myHeaders.append('x-amz-acl', 'public-read');
          var requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            body: arrayDocumentsFiles[documentIndex],
            redirect: 'follow',
          };
          fetch(documentResults[documentIndex]?.data?.link, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              countUploadDocumentSuccess = countUploadDocumentSuccess + 1;
              if (countUploadDocumentSuccess === documentResults.length) {
                ref?.current?.setFieldValue('documents', [...documents, ...documentMetaData]);
                dispatch(loadingSuccess());
              }
            })
            .catch((error) => {
              dispatch(loadingSuccess());
            });
        }
      }
    });
  };

  const getTemporaryUploadDocument = async (fileName: any, videoId: any) => {
    return axios
      .get(config.rest.getTemporaryUploadDocument(fileName, videoId))
      .then((res: any) => {
        return res?.data;
      })
      .catch((err: any) => {
        return err?.data;
      });
  };

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
        onSuccess(videoId);
        ref.current?.setFieldValue('status', 'Processing');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const uploadMetaData = (values: any, videoId: any) => {
    let bodyData: any = {
      name: values.title || '',
      posture_type: values.posture_type || '',
      description: values.description || '',
      tag: values.tags.toString(),
      category_id: selectedCategory?.id,
      category_name: selectedCategory?.name || 'Non category',
      trainer_id: selectedTrainer?.id,
      trainer_name: selectedTrainer?.name,
      status: values?.status === 'Disable' ? 0 : 1,
      documents: values?.documents || [],
    };
    let newBody = { ...bodyData };
    delete newBody.category_name;
    delete newBody.trainer_name;
    callApi(
      {
        method: 'put',
        api: config.rest.editVideo(videoId),
        body: newBody,
        loading: true,
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
          ref.current.resetForm();
          handleClose();
          setUploadFirstTime(false);
          onSuccess(videoId, bodyData);
        }
      },
    );
  };

  const [attention, setAttention] = useState({ show: false, title: '', left: '', right: '', callback: () => {} });

  const handleClose2 = () => {
    handleClose();
    setUploadFirstTime(false);
    ref.current.resetForm();
    setFileErrorMsg('');
    setDocumentErrorMsg('');
    setSelectedFile(null);
  };

  const handleCancel = () => {
    handleClose();
    cancelTokenSource.cancel('Upload cancelled');
    ref.current.resetForm();
    setFileErrorMsg('');
    setDocumentErrorMsg('');
    setSelectedFile(null);
    setUploadingVideos((items: any) => {
      return items.filter((item: any) => item.id !== video.videoId);
    });
    setAttention({ ...attention, show: false });
  };

  const showAttention = (title: string, left: string, right: string, callback: any) => {
    if (
      !ref.current.dirty &&
      (selectedCategory?.id || '1') === formValue.category_id &&
      (selectedTrainer?.id || '') === formValue.trainer_id
    ) {
      handleClose2();
      return;
    }
    setAttention({ ...attention, show: true, title, left, right, callback });
  };

  const uploadingVideo = uploadingVideos.filter((item: any) => item.id === video.videoId)?.[0];
  const thisVideo = videos.data.filter((item: any) => item.id === video.videoId)?.[0];
  const processingVideo = thisVideo?.status === 'Processing';
  const processedVideo = thisVideo?.status === 'Draft' || thisVideo?.status === 'Posted';

  return (
    <div className="flex-row align-items-center">
      <CModal
        size="lg"
        centered
        show={show}
        onClose={handleClose2}
        onClosed={() => handleClose2()}
        closeOnBackdrop={false}
      >
        <CModalHeader>
          {t(type === 'create' ? 'upload-video' : 'edit-video')}
          <i
            className="fa fa-close cursor-pointer"
            onClick={
              type === 'create'
                ? handleClose2
                : () =>
                    showAttention('Are you sure you want to discard your changes?', 'Discard', 'Keep Editing', () => {
                      setAttention({ ...attention, show: false });
                      handleClose2();
                    })
            }
          />
        </CModalHeader>
        <CModalBody>
          <CModal size="sm" show={attention.show} centered closeOnBackdrop={false}>
            <CModalBody style={{ textAlign: 'center' }}>{attention.title}</CModalBody>
            <CModalFooter style={{ display: 'flex', justifyContent: 'space-around' }}>
              <CButton style={{ width: 120 }} color="danger" onClick={attention.callback}>
                {attention.left}
              </CButton>
              <CButton
                style={{ width: 120 }}
                color="primary"
                onClick={() => setAttention({ ...attention, show: false })}
              >
                {attention.right}
              </CButton>
            </CModalFooter>
          </CModal>
          <CRow className="justify-content-center">
            <CCol md="12">
              <CCardGroup>
                <CCard>
                  <CCardBody>
                    <Formik
                      innerRef={ref}
                      enableReinitialize={true}
                      initialValues={formValue}
                      validationSchema={VideoFormSchema}
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
                        setFieldValue,
                        setFieldTouched,
                      }) => (
                        <CForm onSubmit={handleSubmit}>
                          {((type === 'create' && uploadFirstTime) || type === 'update') && (
                            <div>
                              <CRow>
                                <CCol>
                                  <CFormGroup>
                                    <CLabel>{t('title')} (*)</CLabel>
                                    <CInput
                                      type="text"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      invalid={touched.title && errors.title ? true : false}
                                      placeholder={t('title')}
                                      autoComplete="title"
                                      maxLength={100}
                                      value={values?.title || ''}
                                      onBlur={handleBlur}
                                      name="title"
                                    />
                                    {errors?.title && touched.title ? (
                                      <ErrorMessage>{errors.title}</ErrorMessage>
                                    ) : null}
                                  </CFormGroup>
                                  <CFormGroup>
                                    <CLabel>Type (*)</CLabel>
                                    <div className="d-flex mb-2">
                                      <CInput
                                        style={{ maxWidth: 24, marginRight: 10 }}
                                        type="radio"
                                        onChange={handleChange}
                                        checked={values?.posture_type === 'standing'}
                                        value="standing"
                                        name="posture_type"
                                      />
                                      Standing exercises
                                    </div>
                                    <div className="d-flex mb-2">
                                      <CInput
                                        style={{ maxWidth: 24, marginRight: 10 }}
                                        type="radio"
                                        onChange={handleChange}
                                        checked={values?.posture_type === 'sit'}
                                        value="sit"
                                        name="posture_type"
                                      />
                                      Sitting exercises
                                    </div>
                                    <div className="d-flex mb-2">
                                      <CInput
                                        style={{ maxWidth: 24, marginRight: 10 }}
                                        type="radio"
                                        onChange={handleChange}
                                        checked={values?.posture_type === 'lie'}
                                        value="lie"
                                        name="posture_type"
                                      />
                                      Lying down exercises
                                    </div>
                                  </CFormGroup>
                                  <CFormGroup>
                                    <CLabel>{t('description')}</CLabel>
                                    <CInput
                                      type="text"
                                      placeholder={t('description')}
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      autoComplete="description"
                                      maxLength={1000}
                                      value={values?.description || ''}
                                      onBlur={handleBlur}
                                      name="description"
                                    />
                                  </CFormGroup>
                                  <CFormGroup>
                                    <CLabel>Trainer</CLabel>
                                    <div style={{ width: '100%' }}>
                                      <SelectLoadmore
                                        selected={selectedTrainer}
                                        setSelected={setSelectedTrainer}
                                        defaultValue="Select trainer"
                                        value={searchTrainerText}
                                        setValue={setSearchTrainerText}
                                        callbackSearch={getMobilityTrainers}
                                        {...trainers}
                                        maxLength={50}
                                      />
                                    </div>
                                  </CFormGroup>
                                  <CFormGroup>
                                    <CLabel>{t('category')}</CLabel>
                                    <div style={{ width: '100%' }}>
                                      <SelectLoadmore
                                        selected={selectedCategory}
                                        setSelected={setSelectedCategory}
                                        defaultValue="Select category"
                                        value={searchCategoryText}
                                        setValue={setSearchCategoryText}
                                        callbackSearch={getMobilityCategories}
                                        {...categories}
                                        maxLength={100}
                                      />
                                    </div>
                                  </CFormGroup>
                                </CCol>
                                <CCol>
                                  <VideoContainer>
                                    {type === 'update' || values?.video || selectedFile ? (
                                      <div style={{ backgroundColor: colors.gray3, alignItems: 'center', height: 200 }}>
                                        {values?.status !== 'Uploading' && (
                                          <ReactPlayer
                                            url={formValue?.hls_link || values?.video}
                                            width="100%"
                                            height="100%"
                                            controls={true}
                                          />
                                        )}
                                        {type === 'create' && selectedFile && !values?.status && (
                                          <i
                                            onClick={() => {
                                              cancelTokenSource.cancel('Upload cancelled');
                                              setFieldValue('video', null);
                                              setSelectedFile(null);
                                              setUploadingVideos((items: any) => {
                                                return items.filter((item: any) => item.id !== video.videoId);
                                              });
                                            }}
                                            style={{ position: 'absolute', top: 10, right: 10 }}
                                            className="fas fa-times-circle fa-2x"
                                          ></i>
                                        )}
                                      </div>
                                    ) : (
                                      <div>
                                        <UploadFileContainer>
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
                                              setSelectedFile(file);
                                              setFieldValue(
                                                'title',
                                                file?.name?.substr(0, file?.name?.lastIndexOf('.')) || '',
                                              );
                                              setTimeout(() => {
                                                setFieldTouched('title');
                                              });
                                              setFieldValue('video', URL.createObjectURL(file));
                                              setFileErrorMsg('');
                                            }}
                                          >
                                            {({ getRootProps, getInputProps }) => (
                                              <DragContainer {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p style={{ fontWeight: 'bold' }}>
                                                  Drop and Drag file here, or click to select file
                                                </p>
                                                {fileErrorMsg && (
                                                  <FileErrorContainer>
                                                    <i
                                                      style={{ color: colors.error }}
                                                      className="fas fa-exclamation-triangle"
                                                    ></i>
                                                    <FileErrorMsgText>{fileErrorMsg}</FileErrorMsgText>
                                                  </FileErrorContainer>
                                                )}
                                              </DragContainer>
                                            )}
                                          </Dropzone>
                                        </UploadFileContainer>
                                      </div>
                                    )}
                                    <div
                                      className="d-flex justify-content-center"
                                      style={{ position: 'relative', height: 20 }}
                                    >
                                      {uploadingVideo && (
                                        <div
                                          style={{
                                            position: 'absolute',
                                            top: 20,
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
                                      {processingVideo && (
                                        <div style={{ position: 'absolute' }}>
                                          <ReactLoading type="bubbles" color="var(--primary)" width={80} />
                                        </div>
                                      )}
                                      {processedVideo && type === 'create' && (
                                        <div style={{ position: 'absolute', top: 20, fontSize: 16 }}>
                                          <div>Video is processed</div>
                                        </div>
                                      )}
                                    </div>
                                  </VideoContainer>
                                </CCol>
                              </CRow>
                              <CFormGroup>
                                <CLabel>{t('tags')}</CLabel>
                                <TagsInput
                                  value={values?.tags || []}
                                  onChange={(tags) => {
                                    setFieldValue('tags', tags);
                                    setTag('');
                                  }}
                                  inputValue={tag}
                                  onChangeInput={(tagValue: any) => {
                                    const newValue = tagValue?.trim() || '';
                                    if (tagValue === '' || /^[a-z0-9ßüÜöÖäÄ_][-\wßüÜöÖäÄ ]*$/.test(tagValue))
                                      setTag(newValue);
                                  }}
                                  addKeys={[9, 13, 32]}
                                  maxTags={10}
                                  onlyUnique
                                  // validationRegex={/^[a-z0-9ßüÜöÖäÄ_][-\wßüÜöÖäÄ ]*$/i}
                                />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel>Document</CLabel>
                                {values?.documents?.map((document: any, documentIndex: any) => {
                                  return (
                                    <li
                                      key={documentIndex}
                                      style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: spacing[2],
                                      }}
                                    >
                                      <a target="_blank" href={document?.link}>
                                        {document.file_name}
                                      </a>
                                      <i
                                        style={{ marginLeft: 10 }}
                                        onClick={() => {
                                          let newDocuments = [...values.documents];
                                          newDocuments.splice(documentIndex, 1);
                                          setFieldValue('documents', newDocuments);
                                        }}
                                        className="fas fa-times-circle fa"
                                      ></i>
                                    </li>
                                  );
                                })}
                                <div>
                                  <UploadFileContainer>
                                    <Dropzone
                                      accept=".pdf"
                                      disabled={values?.documents?.length > 9}
                                      maxFiles={10}
                                      onDropRejected={(fileRejected) => {
                                        setDocumentErrorMsg(fileRejected[0].errors[0].message || '');
                                      }}
                                      onDropAccepted={(acceptedFiles: any) => {
                                        setDocumentErrorMsg('');
                                        const files: any = acceptedFiles as FileList;
                                        uploadDocuments(files, values?.documents);
                                      }}
                                    >
                                      {({ getRootProps, getInputProps }) => (
                                        <div
                                          {...getRootProps()}
                                          style={{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: '#cccccc',
                                            borderStyle: 'solid',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 10,
                                          }}
                                        >
                                          <input {...getInputProps()} />
                                          <p
                                            style={{
                                              fontWeight: 'bold',
                                              marginBottom: 0,
                                              color: values?.documents?.length > 9 ? 'gray' : undefined,
                                            }}
                                          >
                                            Add document
                                          </p>
                                          {documentErrorMsg && (
                                            <FileErrorContainer>
                                              <i
                                                style={{ color: colors.error }}
                                                className="fas fa-exclamation-triangle"
                                              ></i>
                                              <FileErrorMsgText>{documentErrorMsg}</FileErrorMsgText>
                                            </FileErrorContainer>
                                          )}
                                        </div>
                                      )}
                                    </Dropzone>
                                  </UploadFileContainer>
                                  {type === 'update' &&
                                    (formValue?.status === 'Disable' || formValue?.status === 'Posted') && (
                                      <CLabel style={{ display: 'flex', marginTop: spacing[4] }}>
                                        <Switch
                                          onChange={() => {
                                            if (values?.status === 'Posted') {
                                              setFieldValue('status', 'Disable');
                                            }
                                            if (values?.status === 'Disable') {
                                              setFieldValue('status', 'Posted');
                                            }
                                          }}
                                          checked={values?.status === 'Posted'}
                                          disabled={values?.status === 'Uploading' || values?.status === 'Draft'}
                                        />
                                        <p style={{ marginTop: spacing[1], marginLeft: spacing[2] }}>Posted</p>
                                      </CLabel>
                                    )}
                                </div>
                              </CFormGroup>
                              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {(!!uploadingVideo || type === 'update') && (
                                  <CButton
                                    color="danger"
                                    style={{ width: 100, marginRight: spacing[3] }}
                                    className="px-4"
                                    onClick={() =>
                                      uploadingVideo
                                        ? setAttention({
                                            show: true,
                                            title:
                                              'Are you sure you want to cancel? If yes, the video will be deleted.',
                                            left: 'Yes',
                                            right: 'No',
                                            callback: handleCancel,
                                          })
                                        : showAttention(
                                            'Are you sure you want to discard your changes?',
                                            'Discard',
                                            'Keep Editing',
                                            () => {
                                              setAttention({ ...attention, show: false });
                                              handleClose2();
                                            },
                                          )
                                    }
                                  >
                                    Cancel
                                  </CButton>
                                )}
                                <CButton
                                  color="primary"
                                  className="px-4"
                                  style={{ width: 100 }}
                                  type="submit"
                                  disabled={
                                    type === 'create'
                                      ? !isValid
                                      : !isValid ||
                                        (!dirty &&
                                          selectedCategory?.id === formValue.category_id &&
                                          selectedTrainer?.id === formValue.trainer_id)
                                  }
                                >
                                  Save
                                </CButton>
                              </div>
                            </div>
                          )}
                          {type === 'create' && !uploadFirstTime && (
                            <UploadFileContainer>
                              <Dropzone
                                accept=".mp4,.wmv,.flv,.mov,.avi"
                                maxFiles={1}
                                maxSize={5e9}
                                onDropRejected={(fileRejected) => {
                                  setFileErrorMsg(fileRejected[0].errors[0].message || '');
                                }}
                                onDropAccepted={(acceptedFiles: any) => {
                                  setUploadFirstTime(true);
                                  const file: File = (acceptedFiles as FileList)[0];
                                  getTemporaryUploadLinkVideo(acceptedFiles);
                                  setSelectedFile(file);
                                  setFieldValue('title', file?.name?.substr(0, file?.name?.lastIndexOf('.')) || '');
                                  setTimeout(() => {
                                    setFieldTouched('title');
                                  });
                                  setFieldValue('video', URL.createObjectURL(file));
                                  setFileErrorMsg('');
                                }}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <DragContainer {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p style={{ fontWeight: 'bold' }}>
                                      Drop and Drag file here, or click to select file
                                    </p>
                                    {fileErrorMsg && (
                                      <FileErrorContainer>
                                        <i style={{ color: colors.error }} className="fas fa-exclamation-triangle"></i>
                                        <FileErrorMsgText>{fileErrorMsg}</FileErrorMsgText>
                                      </FileErrorContainer>
                                    )}
                                  </DragContainer>
                                )}
                              </Dropzone>
                            </UploadFileContainer>
                          )}
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

const VideoContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const UploadFileContainer = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;

const DragContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 50px;
  text-align: center;
  border-width: 2px;
  border-style: dashed;
  border-color: #3b83b3;
  border-radius: 5px;
`;

const FileErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const FileErrorMsgText = styled.p`
  font-size: 12px;
  margin-left: ${spacing[2]}px;
  color: ${colors.error};
  margin-bottom: 0px;
`;
