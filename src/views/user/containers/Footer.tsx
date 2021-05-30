import React from 'react';
import googleplay from '../../../assets/images/googleplay.svg';
import appstore from '../../../assets/images/appstore.svg';

const Footer: React.FC = () => {
  return (
    <div className="hb-footer">
      <div className="hb-wrapper">
        <div className="hb-mx-40">
          <div className="hb-footer-logo">
            <div className="hb-footer-logo-img" />
          </div>
          <div className="row hb-footer-container">
            <div className="col-md-6">
              <div className="row p-0">
                <div className="col-md-4 p-0">
                  <div className="hb-footer-label-big">Download App</div>
                  <div className="hb-footer-img">
                    <img src={appstore} alt="appstore" style={{ width: 101, height: 29, marginTop: 8 }} />
                  </div>
                  <div className="hb-footer-img">
                    <img src={googleplay} alt="googleplay" style={{ width: 101, height: 30, marginTop: 8 }} />
                  </div>
                </div>
                <div className="col-md-4 p-0">
                  <div className="hb-footer-label-big">Mehr Erfahren</div>
                  <div className="hb-footer-label-small">HerzBegleiter</div>
                  <div className="hb-footer-label-small">Instagram</div>
                </div>
                <div className="col-md-4 p-0">
                  <div className="hb-footer-label-big">Hilfe</div>
                  <div className="hb-footer-label-small">Über uns</div>
                  <div className="hb-footer-label-small">Kontakt</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4" />
                <div className="col-md-4" />
                <div className="col-md-4">
                  <div className="hb-footer-label-big">Rechtliches</div>
                  <div className="hb-footer-label-small">AGBs</div>
                  <div className="hb-footer-label-small">Impressum</div>
                  <div className="hb-footer-label-small">Datenschutz</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hb-footer-copyright">Alle Rechte vorbehalten 2021 HerzBegleiter GmbH</div>
      </div>
    </div>
  );
};

export default Footer;
