import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { HBButtonFull } from '../../../hbBaseClass';
import Saly26 from '../containers/Saly-26.png';

const NewsfeedIntro: React.FC<RouteComponentProps> = () => {
  const history = useHistory();

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="hb-intro-wrapper">
          <div className="hb-intro-title">Ihr Pflege Magazin so intelligent wie für Sie gemacht</div>
          <div className="hb-intro-content">
            Wir zeigen Ihnen nur die Inhalte, die Sie auch interessieren werden. Ganz wie Sie wünschen und ganz
            automatisch.
          </div>
          <div className="hb-intro-content">Zeigen Sie uns im nächsten Schritt was Ihnen wirklich wichtig ist.</div>
          <div className="hb-intro-img">
            <img src={Saly26} alt="Saly-26" />
          </div>
          <div className="hb-done-intro">
            <HBButtonFull color="violet" onClick={() => history.push('/newsfeed/select-category')}>
              Weiter
            </HBButtonFull>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsfeedIntro;
