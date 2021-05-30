import React, { useEffect, useState } from 'react';
import { CModal, CModalHeader, CModalBody } from '@coreui/react';
import { SUCCESS } from '../../../store/callApi/actions';

interface Props {
  show: boolean;
  handleClose: () => void;
  handleCloseParent: () => void;
  popupViewDocuments: any;
  callApi: any;
}

const ModalSendEmail: React.FC<Props> = (props) => {
  const { show, handleClose, popupViewDocuments, handleCloseParent, callApi } = props;

  const [content, setContent] = useState('');

  useEffect(() => {
    if (!show) return;
    setContent('');
  }, [show]);

  const send = () => {
    callApi(
      {
        method: 'post',
        api: `/api/v1/admin/users/nurse/${popupViewDocuments.id}/re-upload-email`,
        loading: true,
        body: { data: content },
      },
      ({ status }: any) => {
        if (status === SUCCESS) {
          handleClose();
          handleCloseParent();
        }
      },
    );
  };

  return (
    <CModal
      style={{ borderRadius: 10 }}
      size="lg"
      centered
      show={show}
      onClosed={handleClose}
      onClose={handleClose}
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>To: {popupViewDocuments.userEmail}</CModalHeader>
      <CModalBody className="px-4 pt-3" style={{ textAlign: 'right' }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          rows={12}
          placeholder="Email content ..."
        />
        <button className="btn btn-primary px-4 mt-3" onClick={send} disabled={content.trim() === ''}>
          Send
        </button>
      </CModalBody>
    </CModal>
  );
};

export default ModalSendEmail;
