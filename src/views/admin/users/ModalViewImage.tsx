import React from 'react';

interface Props {
  show: boolean;
  handleClose: () => void;
  url: string;
  name: string;
}

const ModalViewImage: React.FC<Props> = (props) => {
  const { show, handleClose, url, name } = props;

  const splitItems = url?.split?.('.');
  const isIframe = splitItems?.[splitItems.length - 1] === 'pdf';

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        display: show ? 'flex' : 'none',
        zIndex: 100,
        top: 0,
        left: 0,
        background: '#1b2638',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
      }}
    >
      <div style={{ height: 60 }}>
        <div
          className="d-flex justify-content-between p-3"
          style={{ width: '100vw', color: '#afc0dc', fontSize: 16, position: 'fixed', top: 0, left: 0 }}
        >
          <div>{name}</div>
          <div className="modal-view-image-close-btn" onClick={handleClose}>
            <i className="fas fa-times" style={{ color: '#9fb0cc', fontSize: 20 }} />
          </div>
        </div>
      </div>
      {isIframe ? (
        <div style={{ height: '90vh', display: 'flex', alignItems: 'center', width: '95vw' }}>
          <iframe
            key={url}
            title={name}
            width="100%"
            height="100%"
            style={{ border: 'solid 1px gray', textAlign: 'center' }}
            src={url}
          />
        </div>
      ) : (
        <div style={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
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
            <img src={url || 'https://i.imgur.com/hGefqAz.jpg'} alt={name} style={{ maxWidth: 1000, maxHeight: 640 }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalViewImage;
