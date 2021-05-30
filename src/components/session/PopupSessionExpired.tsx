import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { HBModalConfirm } from '../../hbBaseClass';

interface Props {
  show: boolean;
  handleClose: () => void;
}

const PopupSessionExpired: React.FC<Props> = (props) => {
  const { show, handleClose } = props;

  const location = useLocation();

  if (location.pathname.includes('/admin'))
    return (
      <CModal centered show={show} onClose={handleClose} closeOnBackdrop={false}>
        <CModalHeader>Info</CModalHeader>
        <CModalBody style={{ textAlign: 'center' }}>Your session has expired. Please sign in again!</CModalBody>
        <CModalFooter style={{ textAlign: 'center', justifyContent: 'center' }}>
          <CButton color="info" className="px-4" onClick={handleClose}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
    );

  return (
    <div className="petrol">
      <HBModalConfirm
        show={show}
        handleClose={handleClose}
        title="Die Info"
        content="Deine Sitzung ist abgelaufen. Bitte neu anmelden!"
        up="OK"
        upCallback={handleClose}
      />
    </div>
  );
};

export default PopupSessionExpired;
