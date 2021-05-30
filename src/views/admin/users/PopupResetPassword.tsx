import React from 'react';
import { CModal, CCol, CModalHeader, CRow, CModalBody, CModalFooter, CButton } from '@coreui/react';
import { callApiAction } from '../../../store/callApi/actions';
import config from '../../../config';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

interface Props {
  show: boolean;
  email: string;
  userId: string;
  handleClose: () => void;
}

const PopupResetPassword: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const { show, email, userId, handleClose } = props;

  const confirm = () => {
    props.handleClose();

    callApi({
      method: 'get',
      api: config.rest.resetPassword(userId),
      msg: config.messages.resetPasswordFailure,
    });
  };

  return (
    <CModal centered show={show} onClose={handleClose} closeOnBackdrop={false}>
      <CModalHeader>{t('reset-password-confirmation')}</CModalHeader>
      <CModalBody>
        {t('do-you-want-to-reset-password')} {email} {t('admin')}?
      </CModalBody>
      <CModalFooter>
        <CRow>
          <CCol>
            <CButton color="danger" className="px-4" onClick={handleClose}>
              {t('no')}
            </CButton>
          </CCol>
          <CCol>
            <CButton color="info" className="px-4" onClick={confirm}>
              {t('yes')}
            </CButton>
          </CCol>
        </CRow>
      </CModalFooter>
    </CModal>
  );
};

export default PopupResetPassword;
