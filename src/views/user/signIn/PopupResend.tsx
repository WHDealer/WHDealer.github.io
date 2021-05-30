import React from 'react';
import { CModal, CCol, CModalHeader, CRow, CModalBody, CModalFooter, CButton } from '@coreui/react';
import { callApiAction } from '../../../store/callApi/actions';
import config from '../../../config';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

interface Props {
  show: boolean;
  email: string;
  handleClose: () => void;
}

const PopupResend: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const { show, email, handleClose } = props;

  const resend = () => {
    handleClose();
    callApi({
      method: 'get',
      api: config.rest.resendVerifyEmail(email),
      msg: config.messages.resendVerifyEmailFailure,
    });
  };

  return (
    <CModal centered show={show} onClose={handleClose}>
      <CModalHeader>{t('resend-confirm-email')}</CModalHeader>
      <CModalBody>
        {t('your-email-has-not-been-verifi')} {email}?
      </CModalBody>
      <CModalFooter>
        <CRow>
          <CCol>
            <CButton color="danger" className="px-4" onClick={handleClose}>
              {t('cancel')}
            </CButton>
          </CCol>
          <CCol>
            <CButton color="info" className="px-4" onClick={resend}>
              {t('resend')}
            </CButton>
          </CCol>
        </CRow>
      </CModalFooter>
    </CModal>
  );
};

export default PopupResend;
