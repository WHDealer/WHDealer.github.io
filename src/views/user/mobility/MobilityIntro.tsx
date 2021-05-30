import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { HBButtonFull } from '../../../hbBaseClass';
import Saly26 from '../containers/Saly-26.png';

const MobilityIntro: React.FC<RouteComponentProps> = () => {
  const history = useHistory();

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="hb-intro-wrapper">
          <div className="hb-intro-title">Zertifizierte, digitale Pflegeanwendung</div>
          <div className="hb-intro-content">
            Im den Lila gefärbten Bereichen der App befinden Sie sich in staatlich geprüften und zertifizierten Inhalten
            und Funktionen.
          </div>
          <div className="hb-intro-img">
            <img src={Saly26} alt="Saly-26" />
          </div>
          <div className="hb-done-intro">
            <HBButtonFull color="violet" onClick={() => history.push('/mobility/posture')}>
              Verstanden
            </HBButtonFull>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilityIntro;
