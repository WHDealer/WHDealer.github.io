import React, { useRef, useState } from 'react';
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
  CInputGroup,
  CInvalidFeedback,
  CFormGroup,
  CTextarea,
  CModalFooter,
} from '@coreui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { validate } from '../../../utils';
import config from '../../../config';
import { SUCCESS } from '../../../store/callApi/actions';
import { CModal } from '../../../components';
import FieldName from '../containers/FieldName';

const validationSchema = function (values: any) {
  return Yup.object().shape({
    title: Yup.string().trim().required('Category name is required'),
  });
};

interface Props {
  searchCategories: () => void;
  handleClose: () => void;
  show: boolean;
  initialValues: any;
  callApi: any;
}

const ModalCreateCategory: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const { searchCategories, show, initialValues, callApi } = props;
  const formRef = useRef<any>(null);

  const onSubmit = (values: { title: string; description: string }) => {
    const body = {
      title: values.title.trim(),
      description: values.description.trim(),
    };
    callApi(
      { method: 'post', api: config.rest.adminCreateMobilityCategory(), body, loading: true },
      ({ status }: any) => {
        if (status === SUCCESS) {
          searchCategories();
        }
      },
    );
    handleClose();
  };

  const [attention, setAttention] = useState(false);

  const handleClose = () => {
    formRef.current.resetForm();
    props.handleClose();
    setAttention(false);
  };

  const showAttention = () => {
    if (!formRef.current.dirty) {
      handleClose();
      return;
    }
    setAttention(true);
  };

  return (
    <CModal centered show={show} onClose={handleClose} closeOnBackdrop={false}>
      <CModalHeader>
        New Category
        <i className="fa fa-close cursor-pointer" onClick={showAttention} />
      </CModalHeader>
      <CModalBody className="popup--update-user">
        <CModal size="sm" show={attention} centered closeOnBackdrop={false}>
          <CModalBody style={{ textAlign: 'center' }}>Are you sure you want to discard your changes?</CModalBody>
          <CModalFooter style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="btn btn-danger" style={{ width: 160 }} color="danger" onClick={handleClose}>
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
                        <FieldName label="Title (*)" width={100}>
                          <CFormGroup className="m-0">
                            <CInput
                              type="text"
                              placeholder="Title (*)"
                              invalid={values.title.trim() !== '' && touched.title && !!errors.title}
                              maxLength={100}
                              value={values.title}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="title"
                            />
                            <CInvalidFeedback>{errors.title}</CInvalidFeedback>
                          </CFormGroup>
                        </FieldName>
                        <FieldName label="Description" width={100}>
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
                        </FieldName>
                        <CFormGroup className="mb-0">
                          <CRow>
                            <CCol xs="12" style={{ textAlign: 'right' }}>
                              <CButton color="secondary" className="px-4 mr-4" onClick={handleClose}>
                                {t('cancel')}
                              </CButton>
                              <CButton color="primary" className="px-4" type="submit" disabled={!(isValid && dirty)}>
                                {t('create')}
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

export default ModalCreateCategory;
