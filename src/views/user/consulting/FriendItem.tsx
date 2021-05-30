import React, { useState } from 'react';
import { CButton, CImg } from '@coreui/react';
import { useHistory } from 'react-router';

interface Props {
  first_name: string;
  last_name: string;
  img: any;
  id: any;
  changeStatus?: any;
  status?: 'friend' | 'confirm' | 'cancel' | null;
  menuPopup?: any;
  handleOpen?: any;
  handleClose?: any;
  search?: any;
  setPopUpCancel?: any;
  setPopupRequestCancel?: any;
}

const FriendItem: React.FC<Props> = (props) => {
  const {
    first_name,
    last_name,
    img,
    id,
    changeStatus,
    status,
    handleOpen,
    search,
    setPopUpCancel,
    setPopupRequestCancel,
  } = props;
  const history = useHistory();
  const [success, setSuccess] = useState('');

  const checkStatus = (status: any, search: any) => {
    if (status === 'friend') {
      if (search === false)
        return (
          <div onClick={(e) => handleOpen(e, { id })}>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        );

      return (
        <div>
          <CButton
            color="primary"
            variant="outline"
            onClick={() => {
              setPopUpCancel({ show: true });
            }}
          >
            Unfriend
          </CButton>
          <CButton
            color="primary"
            variant="outline"
            onClick={() => {
              console.log('123');
              // history.push('/consulting/add-friend');
            }}
          >
            <i className="fas fa-phone"></i> Call
          </CButton>
        </div>
      );
    }

    if (status === 'confirm') {
      // Request removed
      if (success !== '') return <div>{success}</div>;
      return (
        <div style={{ width: 150, display: 'flex', justifyContent: 'space-between' }}>
          <CButton
            id="btn_delete"
            color="primary"
            variant="outline"
            onClick={() => {
              changeStatus(id, 'cancel');
              setSuccess('Request removed');
            }}
          >
            Delete
          </CButton>
          <CButton
            id="btn_confirm"
            color="primary"
            variant="outline"
            onClick={() => {
              changeStatus(id, 'confirm');
              setSuccess('Request accepted');
            }}
          >
            Confirm
          </CButton>
        </div>
      );
    }
    if (status === 'cancel') {
      return (
        <CButton color="primary" variant="outline" onClick={() => setPopupRequestCancel({ show: true })}>
          Cancel request
        </CButton>
      );
    }

    return (
      <CButton color="primary" variant="outline" onClick={() => changeStatus(id, null)}>
        Add friend
      </CButton>
    );
  };

  return (
    <div>
      <div
        className="friend-request-main-page-body--wrapper"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 7,
          border: '1px solid ',
          padding: 8,
        }}
      >
        <div
          className="friend-request-main-page-body--information"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => history.push(`/consulting/information/${id}`)}
        >
          <CImg
            src={img || 'https://i.stack.imgur.com/l60Hf.png'}
            alt="Avatar"
            width={80}
            height={80}
            style={{ borderRadius: 10 }}
          />
          <h4 style={{ marginLeft: 20 }}>
            {first_name} {last_name}
          </h4>
        </div>
        <div className="friend-request-main-page-body--config">{checkStatus(status, search)}</div>
      </div>
    </div>
  );
};

export default FriendItem;
