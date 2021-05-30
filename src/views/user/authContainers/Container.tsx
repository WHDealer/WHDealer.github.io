import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react';
import React from 'react';
import styles from './Container.module.scss';
import Header from './Header';

type Props = {
  className?: string;
  children?: React.ReactNode;
}

const Container: React.FC<Props> = (props) => {
  const { className = '', children } = props;

  return (
    <div className={`hb-user c-app c-default-layout flex-row align-items-center ${styles.wrapper} ${className}`}>
      <Header />
      <CContainer className={styles.container}>
        <CRow className="justify-content-center">
          <CCol md="4" lg="4" xl="4" className={styles.cardContainer}>
            <CCard className={`p-1 ${styles.cardWrapper}`}>
              <CCardBody className={styles.cardBody}>{children}</CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Container;
