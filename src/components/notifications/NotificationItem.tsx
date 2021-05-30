import React from 'react';
import { ItemNotificationType } from '../../config';
import { timestampToDatetime } from '../../utils';

// "{\"type\":\"friend_requested\",\"id\":\"123\",\"body\":\"You have a friend requests from Nguyen Khanh\",\"created_date\":123456789,\"image\":\"\"}"

type ItemNotificationWrapper = {
  id: string;
  image: string | null;
  is_read: boolean;
  show_circle?: boolean;
};

const ItemNotificationWrapper: React.FC<ItemNotificationWrapper> = (props) => {
  const { id, image, children, show_circle } = props;
  return (
    <div className="noti-drop-down-item">
      <img
        alt="avatar"
        className="noti-item-avatar"
        src={image || 'https://voz.vn/data/avatars/o/1669/1669906.jpg?1583936918'}
      />
      <div style={{ width: '100%' }}>{children}</div>
      <div className="d-flex align-items-center" style={{ visibility: show_circle ? 'visible' : 'hidden' }}>
        <i className="fa fa-circle" style={{ marginLeft: 4, fontSize: 10, color: 'var(--primary)' }} />
      </div>
    </div>
  );
};

const ItemFriendRequested: React.FC<ItemNotificationType> = (props) => {
  const { body, created_date } = props;
  return (
    <ItemNotificationWrapper {...props}>
      <div className="noti-item-body">
        <div className="noti-item-content">{body}</div>
        <div className="noti-item-created-date active">{timestampToDatetime(created_date)}</div>
        <div className="d-flex justify-content-center mt-2">
          <button className="btn btn-danger" style={{ width: 90, padding: 3 }}>
            Delete
          </button>
          <button className="btn btn-primary ml-4" style={{ width: 90, padding: 3 }}>
            Confirm
          </button>
        </div>
      </div>
    </ItemNotificationWrapper>
  );
};

const ItemFriendRequestAccepted: React.FC<ItemNotificationType> = (props) => {
  const { body, created_date, is_read } = props;
  return (
    <ItemNotificationWrapper {...props} show_circle={!is_read}>
      <div className="noti-item-body">
        <div className={`noti-item-content ${is_read ? 'seen' : ''}`}>{body}</div>
        <div className={`noti-item-created-date ${is_read ? 'seen' : ''}`}>{timestampToDatetime(created_date)}</div>
      </div>
    </ItemNotificationWrapper>
  );
};

export { ItemFriendRequested, ItemFriendRequestAccepted };
