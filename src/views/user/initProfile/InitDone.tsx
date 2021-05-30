import React from 'react';
// import { CRow, CButton } from '@coreui/react';
//import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styles from './InitProfile.module.scss';
import { HBButton } from '../../../hbBaseClass';

interface Props {
  back: any;
}

const InitDone: React.FC<Props> = () => {
  const history = useHistory();

  return (
    <div className={styles.initDone}>
      <div className={styles.title}>Daten mit Unterschrift bestätigen</div>

      <HBButton
        color="petrol"
        btnClassName={styles.btn}
        children="Via Docusign unterschreiben"
        onClick={() => history.push({ pathname: '/zur-app', state: false })}
        className={styles.wrap}
      />
    </div>
  );
};

export default InitDone;
