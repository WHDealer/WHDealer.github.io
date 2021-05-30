import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styles from './SureApp.module.scss';
import ContainerAuth from '../authContainers/Container';
import { HBButton } from '../../../hbBaseClass/index';

const SureApp: React.FC<RouteComponentProps> = (props: any) => {
  const history = useHistory();

  return (
    <ContainerAuth className="SurApp-container">
      <div className={styles.wrapper}>
        <h1 className={styles.cardTitle}>Sie haben sich erfolgreich registiert</h1>
        <p className={styles.content}>
          Bitte kontrollieren Sie ihre Emails und aktivieren Sie Ihren Account indem Sie auf den zugesendeten
          Aktivierungslink klicken.
        </p>
        <div className={styles.image}></div>
        <HBButton
          color="violet"
          children="Zur App"
          btnClassName={styles.btnSubmit}
          onClick={() => history.push('sign-in')}
        />
      </div>
    </ContainerAuth>
  );
};

export default SureApp;
