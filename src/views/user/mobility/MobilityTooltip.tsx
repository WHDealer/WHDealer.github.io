import React, { useEffect } from 'react';

interface Props {
  showTooltip: any;
  confirmTooltip: any;
}

const MobilityTooltip: React.FC<Props> = (props) => {
  const { showTooltip, confirmTooltip } = props;

  useEffect(() => {
    if (showTooltip) {
      document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
    } else {
      document.getElementsByTagName('html')[0].style.overflowY = 'overlay';
    }
  }, [showTooltip]);

  return (
    <div className="d-flex" style={{ position: 'relative' }}>
      {showTooltip && <div className="hb-backdrop" />}
      {props.children}
      {showTooltip && (
        <div>
          <div className="hb-mobility-tooltip">
            <div className="arrow" />
            <div className="title">Sind die Übungen zu schwer?</div>
            <div className="content">
              Sie können nur Übungen im Liegen absolvieren? Passen Sie die Videos Ihren Bewegungsmöglichkeiten an.
            </div>
            <div className="btn" onClick={confirmTooltip}>
              Verstanden
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilityTooltip;
