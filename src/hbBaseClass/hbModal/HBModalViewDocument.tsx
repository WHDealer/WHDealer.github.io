import React from 'react';
import HBModal from './HBModal';

interface Props {
  show: boolean;
  handleClose: any;
  name: string;
  url: string;
}

const HBModalViewDocument: React.FC<Props> = (props) => {
  const { show, handleClose, name, url } = props;

  const splitItems = url.split('.');
  const isIframe = splitItems[splitItems.length - 1] === 'pdf';

  return (
    <HBModal
      size="xl"
      style={{ height: '90vh' }}
      centered
      closeBtn
      show={show}
      onClose={handleClose}
      closeOnBackdrop={false}
    >
      <div className="hb-modal-body">{name}</div>
      {isIframe ? (
        <div style={{ height: '90vh', display: 'flex', alignItems: 'center', width: '100%' }}>
          <iframe key={url} title={name} width={'100%'} height={'92%'} src={url} style={{ border: 'none' }} />
        </div>
      ) : (
        <div style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: 1000,
              minHeight: 500,
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={url || 'https://i.imgur.com/hGefqAz.jpg'}
              alt={name}
              style={{ maxWidth: 1000, maxHeight: 640, width: '100%', margin: '0 auto' }}
            />
          </div>
        </div>
      )}
    </HBModal>
  );
};

export default HBModalViewDocument;
