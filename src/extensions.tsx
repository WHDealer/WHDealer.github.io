import { CSpinner, CPagination } from '@coreui/react';

export const ls = require('local-storage');
export const jwt = require('jsonwebtoken');

export const loading = (
  <div className="spin--loading">
    <CSpinner
      // color="#36d7b7"
      style={{
        width: '4.5rem',
        height: '4.5rem',
        margin: 'auto',
        border: '0.4em solid #36d7b7',
        borderRightColor: 'transparent',
      }}
    />
  </div>
);

export const loadingSmall = (
  <div className="spin--loading-small">
    <CSpinner
      style={{
        width: '2rem',
        height: '2rem',
        margin: 'auto',
        border: '0.28em solid #959697',
        borderRightColor: 'transparent',
      }}
    />
  </div>
);

export const ArrowLeft = <i className="fas fa-angle-left" />;
export const ArrowRight = <i className="fas fa-angle-right" />;

export const defaultAvatar = 'https://i.imgur.com/qyn9t8L.png';
export const videoNoThumbnail = 'https://i.imgur.com/PbEoHqI.jpg';
export const defaultTrainer = 'https://i.imgur.com/pHqsRLz.png';

export const pagination = (totalPages: number, page: number, pageChange: any, total: number) => {
  const first = 1 + 10 * (page - 1);
  let last = 10 + 10 * (page - 1);
  if (last > total) last = total;

  return totalPages > 0 ? (
    <div className="d-flex" style={{ justifyContent: 'space-between' }}>
      <div />
      {totalPages > 1 ? (
        <CPagination
          activePage={page}
          onActivePageChange={pageChange}
          pages={totalPages}
          arrows={true}
          doubleArrows={true}
          align="center"
        />
      ) : (
        <div />
      )}
      <div>
        {first} - {last} of {total} item{total > 1 ? 's' : ''}
      </div>
    </div>
  ) : null;
};

export const logoMain = (
  <img
    src="https://d1aettbyeyfilo.cloudfront.net/herzbegleiter/13700951_1602512108368logo_white2x.webp"
    alt="logo"
    style={{ width: 168, objectFit: 'cover' }}
  />
);
