import React from 'react';
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
  CTextarea,
  CFormGroup,
  CSelect,
} from '@coreui/react';
import { Formik } from 'formik';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { statuses } from './constants';
import { useDispatch } from 'react-redux';
import FieldName from '../containers/FieldName';
import * as Yup from 'yup';
import { getErrorsFromValidationError } from '../../../utils';

interface Props {
  reload: () => void;
  handleClose: () => void;
  show: boolean;
  initialValues: any;
}

const validationSchema = function (values: any) {
  return Yup.object().shape({
    text: Yup.string().required('Required.'),
    text_de: Yup.string().required('Required.'),
    descriptions: Yup.string().required('Required.'),
  });
};

const validate = (getValidationSchema: any) => {
  return (values: any) => {
    const validationSchemas = getValidationSchema(values);
    try {
      validationSchemas.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

const ModalUpdateMessage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const { reload, handleClose, show, initialValues } = props;

  const onSubmit = (values: {
    message_id: string;
    popup: string;
    status: string;
    text: string;
    text_de: string;
    duration: string;
    descriptions: string;
  }) => {
    const newValues = {
      popup: values.popup === 'true' ? true : false,
      status: values.status,
      text: values.text.trim(),
      text_de: values.text_de.trim(),
      duration: values.popup === 'false' ? 0 : parseInt(values.duration),
      descriptions: values.descriptions.trim(),
    };
    const body = JSON.stringify(newValues);
    callApi(
      {
        method: 'put',
        api: config.rest.updateMessage(values.message_id),
        body: body,
        loading: true,
        msg: config.messages.updateMessageFailure,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          reload();
          handleClose();
        }
      },
    );
  };

  return (
    <div className="flex-row align-items-center">
      <CModal size="lg" centered show={show} onClose={handleClose} closeOnBackdrop={false}>
        <CModalHeader closeButton>Update Message</CModalHeader>
        <CModalBody className="popup--update-user">
          <CRow className="justify-content-center">
            <CCol md="12">
              <CCardGroup>
                <CCard className="popup--update-user__card--wrapper">
                  <CCardBody>
                    <Formik
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
                          <FieldName label="Message Id" width={140}>
                            <CFormGroup className="m-0">
                              <CInput disabled type="number" value={values.message_id} name="message_id" />
                            </CFormGroup>
                          </FieldName>
                          <FieldName label="Popup" width={140}>
                            <CFormGroup className="m-0">
                              <CSelect value={values.popup} onChange={handleChange} name="popup">
                                <option>true</option>
                                <option>false</option>
                              </CSelect>
                            </CFormGroup>
                          </FieldName>
                          <FieldName label="Status" width={140}>
                            <CFormGroup className="m-0">
                              <CSelect value={values.status} onChange={handleChange} name="status">
                                {statuses.map((value: string) => (
                                  <option key={value}>{value}</option>
                                ))}
                              </CSelect>
                            </CFormGroup>
                          </FieldName>
                          <FieldName label="English Message" width={140}>
                            <CFormGroup className="m-0">
                              <CInput
                                required
                                maxLength={200}
                                type="text"
                                placeholder="English Message"
                                value={values.text}
                                name="text"
                                onChange={handleChange}
                              />
                            </CFormGroup>
                          </FieldName>
                          <FieldName label="German Message" width={140}>
                            <CFormGroup className="m-0">
                              <CInput
                                required
                                maxLength={200}
                                type="text"
                                placeholder="German Message"
                                value={values.text_de}
                                name="text_de"
                                onChange={handleChange}
                              />
                            </CFormGroup>
                          </FieldName>
                          <FieldName label="Duration" width={140}>
                            <CFormGroup className="m-0">
                              <CInput
                                type="number"
                                min={1}
                                disabled={values.popup === 'false' || !values.popup}
                                placeholder="Duration"
                                value={values.popup === 'false' || !values.popup ? 0 : values.duration}
                                name="duration"
                                onChange={handleChange}
                              />
                            </CFormGroup>
                          </FieldName>
                          <FieldName label="Description" width={140}>
                            <CFormGroup className="m-0">
                              <CTextarea
                                type="text"
                                placeholder="Description"
                                value={values.descriptions}
                                name="descriptions"
                                maxLength={50}
                                onChange={handleChange}
                              />
                            </CFormGroup>
                          </FieldName>
                          <CFormGroup className="d-flex justify-content-end mb-0">
                            <CButton color="primary" className="px-4" type="submit" disabled={!(isValid && dirty)}>
                              Update
                            </CButton>
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
    </div>
  );
};

export default ModalUpdateMessage;
