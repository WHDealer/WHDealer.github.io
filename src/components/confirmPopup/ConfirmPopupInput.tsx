import { CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react';
import React, { useState } from 'react';

interface Props {
  isVisible: boolean;
  title: string;
  content: string;
  leftButtonText: string;
  rightButtonText: string;
  placeholder?: string;
  callback: (value: string) => void;
  handleClose: () => void;
}

const ConfirmPopupInput: React.FC<Props> = (props) => {
  const { isVisible, title, content, leftButtonText, callback, rightButtonText, handleClose, placeholder } = props;

  const [value, setValue] = useState('');

  const close = () => {
    handleClose();
    setValue('');
  };

  const ok = () => {
    callback(value.trim());
    close();
  };

  return (
    <CModal centered show={isVisible} onClose={close} closeOnBackdrop={false}>
      <CModalHeader>{title}</CModalHeader>
      <CModalBody style={{ textAlign: 'center', padding: 30 }}>
        <div>
          <div className="mb-3">{content}</div>
          <textarea
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            className="form-control"
            placeholder={placeholder}
            rows={5}
            maxLength={200}
          />
        </div>
      </CModalBody>
      <CModalFooter style={{ justifyContent: 'center' }}>
        <CRow>
          <CCol>
            <CButton style={{ width: 180 }} color="danger" className="px-4" onClick={close}>
              {leftButtonText}
            </CButton>
          </CCol>
          <CCol>
            <CButton style={{ width: 180 }} color="info" className="px-4" disabled={value.trim() === ''} onClick={ok}>
              {rightButtonText}
            </CButton>
          </CCol>
        </CRow>
      </CModalFooter>
    </CModal>
  );
};

export default ConfirmPopupInput;
