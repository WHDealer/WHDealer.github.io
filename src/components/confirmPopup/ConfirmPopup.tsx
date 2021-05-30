import { CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react';
import React from 'react';

interface ConfirmPopupProps {
  isVisible?: boolean;
  title?: string;
  content?: string;
  renderContent?: () => void;
  leftButtonText?: string;
  rightButtonText?: string;
  leftButtonOnPress?: () => void;
  rightButtonOnPress?: () => void;
  handleClose?: () => void;
  btnWidth?: number;
  hideTitle?: boolean;
  centered?: boolean;
}

export const ConfirmPopup: React.FC<ConfirmPopupProps> = (props) => {
  const { btnWidth, hideTitle, centered } = props;

  return (
    <CModal centered show={props.isVisible} onClose={props.handleClose} closeOnBackdrop={false}>
      {!hideTitle && (
        <CModalHeader style={centered ? { display: 'flex', justifyContent: 'center' } : {}}>{props.title}</CModalHeader>
      )}
      <CModalBody style={centered ? { textAlign: 'center', padding: 30 } : {}}>
        {props.content || props.renderContent?.()}
      </CModalBody>
      <CModalFooter style={centered ? { justifyContent: 'center' } : {}}>
        <CRow>
          <CCol>
            <CButton
              style={btnWidth ? { width: btnWidth } : {}}
              color="danger"
              className="px-4"
              onClick={() => props?.leftButtonOnPress?.()}
            >
              {props.leftButtonText}
            </CButton>
          </CCol>
          <CCol>
            <CButton
              style={btnWidth ? { width: btnWidth } : {}}
              color="info"
              className="px-4"
              onClick={() => props?.rightButtonOnPress?.()}
            >
              {props.rightButtonText}
            </CButton>
          </CCol>
        </CRow>
      </CModalFooter>
    </CModal>
  );
};
