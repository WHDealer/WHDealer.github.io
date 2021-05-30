import { CSpinner } from '@coreui/react';
import React from 'react';
import { HBButtonFull } from '../../../hbBaseClass';
import styles from './InitProfile.module.scss';

interface Props {
  next: any;
  data: any;
  step: number;
}

const Intro: React.FC<Props> = (props: any) => {
  const { next, data, step } = props;

  return (
    <div className={styles.intro}>
      <div className={styles.title}>Gleich geschafft...</div>
      <div className={`${styles.content} ${styles.cardResContent}`}>
        Bitte vervollständigen Sie Ihr Profil, um dne Registrierungsprozess abzuschließen.
      </div>
      <div className={styles.footer}>
        <div className={styles.wrapperBack}>
          <HBButtonFull
            color="petrol"
            outline
            children="Überspringen"
            //className={styles.back}
            disabled={step === 0}
            // onClick={() => {
            //   if (step > 0) setStep(step - 1);
            // }}
            //className={styles.wrapperBack}
          />
        </div>

        <div className={styles.wrapperBack}>
          <HBButtonFull
            color="petrol"
            children={data.first_name ? 'Weiter' : <CSpinner size="sm" color="light" />}
            //className={styles.next}
            disabled={data.first_name === ''}
            onClick={next}
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
