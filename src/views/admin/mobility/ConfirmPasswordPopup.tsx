import { CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';

interface Props {
  isVisible?: boolean;
  categoryName: string;
  handleClose?: () => void;
}

export const ConfirmPasswordPopup: React.FC<Props> = (props) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.isVisible) setPassword('');
  }, [props.isVisible]);

  return (
    <CModal centered show={props.isVisible} onClose={props.handleClose} closeOnBackdrop={false}>
      <CModalHeader>Delete category</CModalHeader>
      <CModalBody>
        <div>
          Please enter your password to delete category "{props.categoryName}"!
          <input
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            className="form-control mt-3"
            placeholder="Enter password"
          />
        </div>
      </CModalBody>
      <CModalFooter>
        <CRow>
          <CCol>
            <CButton color="danger" className="px-4" onClick={() => props?.handleClose?.()}>
              Cancel
            </CButton>
          </CCol>
          <CCol>
            <CButton color="info" className="px-4" disabled={!password} onClick={() => props?.handleClose?.()}>
              Delete
            </CButton>
          </CCol>
        </CRow>
      </CModalFooter>
    </CModal>
  );
};
