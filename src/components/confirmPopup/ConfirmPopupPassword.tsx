import { CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react';
import React, { useState } from 'react';
import config from '../../config';

interface Props {
  isVisible: boolean;
  title: string;
  content: string;
  leftButtonText: string;
  rightButtonText: string;
  callback: (password: string) => void;
  handleClose: () => void;
}

const ConfirmPopupPassword: React.FC<Props> = (props) => {
  const { isVisible, title, content, leftButtonText, callback, rightButtonText, handleClose } = props;

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const close = () => {
    setPassword('');
    setShowPassword(false);
    handleClose();
  };

  const ok = () => {
    close();
    callback(password);
  };

  return (
    <CModal centered show={isVisible} onClose={close} closeOnBackdrop={false}>
      <CModalHeader>{title}</CModalHeader>
      <CModalBody style={{ textAlign: 'center', padding: 30 }}>
        <div>
          <div>{content}</div>
          <div className="d-flex align-items-center mt-3 justify-content-center">
            <input
              value={password}
              onChange={(e: any) => {
                if (!e.target.value.includes(' ')) setPassword(e.target.value);
              }}
              type={showPassword ? 'text' : 'password'}
              className="form-control mr-3"
              placeholder="Password"
              style={{ width: '80%' }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              maxLength={16}
            />
            <i
              className={`fas cursor-pointer ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ width: 18, height: 18, color: 'gray' }}
            />
          </div>
          {password !== '' && !focused && !config.validate.validatePassword().test(password) && (
            <div style={{ margin: '0.4rem 1rem 0 0', fontSize: '80%', color: '#e55353' }}>
              Your password must be at least 8 characters long with one letter, and a number
            </div>
          )}
        </div>
      </CModalBody>
      <CModalFooter style={{ justifyContent: 'center' }}>
        <CRow>
          <CCol>
            <CButton style={{ width: 120 }} color="danger" className="px-4" onClick={close}>
              {leftButtonText}
            </CButton>
          </CCol>
          <CCol>
            <CButton
              style={{ width: 120 }}
              color="info"
              className="px-4"
              disabled={!config.validate.validatePassword().test(password)}
              onClick={ok}
            >
              {rightButtonText}
            </CButton>
          </CCol>
        </CRow>
      </CModalFooter>
    </CModal>
  );
};

export default ConfirmPopupPassword;
