import React, { useRef, useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalBody,
  CButton,
  CForm,
  CInput,
  CTextarea,
  CModalFooter,
  CInvalidFeedback,
  CFormGroup,
} from '@coreui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useDispatch } from 'react-redux';
import { validate } from '../../../utils';
import { loadingRequest, loadingSuccess } from '../../../store/loading/actions';
import FieldName from '../containers/FieldName';

const validationSchema = function (values: any) {
  return Yup.object().shape({
    title: Yup.string().trim().required(''),
    summary: Yup.string().trim().required(''),
    source: Yup.string()
      .trim()
      .required('')
      .matches(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        'URL is invalid',
      ),
  });
};

interface Props {
  id: string;
  name: string;
  setArticles: any;
  handleClose: () => void;
  show: boolean;
  page: number;
  pageSize: number;
}

const initialValues = {
  title: '',
  summary: '',
  source: '',
  image: '',
  type: 'text',
};

const isValidURL = (str: string) => {
  const res = str.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  return res !== null;
};

const ModalCreateUser: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [image, setImage] = useState({ url: '', name: '' });

  const { id, name, setArticles, handleClose, show, page, pageSize } = props;
  const formRef = useRef<any>(null);

  const onSubmit = (values: any) => {
    const body = {
      title: values.title.trim(),
      summary: values.summary.trim(),
      source: values.source.trim(),
      image: image.url,
      type: values.type,
    };
    callApi(
      {
        method: 'post',
        api: config.rest.adminCreateNewsfeedArticle(id),
        body: body,
        loading: true,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          setArticles((articles: any) => {
            const newData = [{ ...body, created_date: new Date().getTime() / 1000 }, ...articles.data]
              .slice(0, pageSize)
              .map((item: any, index: number) => {
                return { ...item, no: index + 1 + pageSize * (page - 1) };
              });
            return {
              ...articles,
              data: newData,
              total: articles.total + 1,
              totalPages: Math.ceil((articles.total + 1) / pageSize),
              loading: false,
            };
          });
          close();
        }
      },
    );
  };

  const fileRef = useRef<any>(null);

  const onUploadImage = (e: any) => {
    let file = e.target.files[0];
    if (!file) return;
    dispatch(loadingRequest());
    callApi(
      {
        api: `/api/v1/upload/image-article?file_name=${file.name}`,
        method: 'get',
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          const url = data.file_path.link;
          const myHeaders = new Headers();
          myHeaders.append('x-amz-acl', 'public-read');
          const requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            body: file,
            redirect: 'follow',
          };
          fetch(data.link, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              setImage({ url, name: file.name });
              dispatch(loadingSuccess());
            })
            .catch((error) => {
              console.log(error);
              dispatch(loadingSuccess());
            });
        } else {
          dispatch(loadingSuccess());
        }
      },
    );
  };

  const [attention, setAttention] = useState(false);

  const close = () => {
    formRef.current.resetForm();
    setImage({ url: '', name: '' });
    setAttention(false);
    handleClose();
  };

  const showAttention = () => {
    if (!formRef.current.dirty && !image.name) {
      close();
      return;
    }
    setAttention(true);
  };

  return (
    <div className="flex-row align-items-center">
      <CModal size="lg" centered show={show} onClose={handleClose} closeOnBackdrop={false}>
        <CModalHeader>
          Create new article
          <i className="fa fa-close cursor-pointer" style={{ color: 'gray' }} onClick={showAttention} />
        </CModalHeader>
        <CModalBody>
          <CModal size="sm" show={attention} centered closeOnBackdrop={false}>
            <CModalBody style={{ textAlign: 'center' }}>Are you sure you want to discard your changes?</CModalBody>
            <CModalFooter style={{ display: 'flex', justifyContent: 'space-around' }}>
              <CButton style={{ width: 120 }} color="danger" onClick={close}>
                Discard
              </CButton>
              <CButton style={{ width: 120 }} color="primary" onClick={() => setAttention(false)}>
                Keep editing
              </CButton>
            </CModalFooter>
          </CModal>
          <Formik
            innerRef={formRef}
            enableReinitialize={true}
            initialValues={initialValues}
            validate={validate(validationSchema)}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, dirty, handleChange, handleSubmit, isValid, handleBlur }) => (
              <CForm onSubmit={handleSubmit}>
                <FieldName label="Title (*)">
                  <CInput
                    type="text"
                    placeholder="Title (*)"
                    maxLength={100}
                    invalid={values.title.trim() !== '' && touched.title && !!errors.title}
                    value={values.title}
                    onChange={handleChange}
                    name="title"
                  />
                </FieldName>
                <FieldName label="Summary (*)">
                  <CTextarea
                    type="text"
                    placeholder="Summary (*)"
                    rows={5}
                    maxLength={1000}
                    invalid={values.summary.trim() !== '' && touched.summary && !!errors.summary}
                    value={values.summary}
                    onChange={handleChange}
                    name="summary"
                  />
                </FieldName>
                <FieldName label="Category">
                  <CInput value={name} disabled />
                </FieldName>
                <FieldName label="URL (*)">
                  <CFormGroup className="m-0">
                    <CInput
                      placeholder="URL (*)"
                      invalid={values.source.trim() !== '' && touched.source && !!errors.source}
                      value={values.source}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="source"
                    />
                    <CInvalidFeedback className="ml-2">{errors.source}</CInvalidFeedback>
                  </CFormGroup>
                </FieldName>
                <FieldName label="Image (*)">
                  <div className="d-flex align-items-center">
                    <CButton
                      color="primary"
                      className="mr-3"
                      onClick={() => fileRef.current.click()}
                      disabled={!!image.name}
                      style={{ minWidth: 120 }}
                    >
                      Upload image
                    </CButton>
                    <div className="ellipsis-1-line">{image.name}</div>
                    {image.name && (
                      <i
                        className="fa fa-times-circle ml-2 cursor-pointer"
                        style={{ color: 'gray', minWidth: 30 }}
                        onClick={() => setImage({ url: '', name: '' })}
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    hidden
                    ref={fileRef}
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={onUploadImage}
                  />
                </FieldName>
                <div style={{ textAlign: 'right' }}>
                  <CButton color="primary" className="px-4" type="submit" disabled={!(isValid && dirty && image.url)}>
                    Save
                  </CButton>
                </div>
              </CForm>
            )}
          </Formik>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default ModalCreateUser;
