import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FrameLoading } from '../../components';
import { ItemNotificationType } from '../../config';
import { fetchNotifications } from '../../store/notifications/actions';
import { ItemFriendRequested, ItemFriendRequestAccepted } from './NotificationItem';

interface Props {
  show: boolean;
  handleClose: () => void;
  notifications: any;
}

const mappingType: any = {
  friend_requested: ItemFriendRequested,
  friend_request_accepted: ItemFriendRequestAccepted,
};

const NotificationsDropDown: React.FC<Props> = (props) => {
  const { show, handleClose, notifications } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!show) return;

    if (notifications.data.length === 0 && !notifications.loading && !notifications.full) {
      fetchNotifications(dispatch, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const ref = useRef<any>(null);

  useEffect(() => {
    if (!show) return;
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, show]);

  let render;
  if (notifications.data.length === 0) {
    if (notifications.loading)
      render = (
        <div className="d-flex align-items-center" style={{ height: '80%' }}>
          <FrameLoading size="lg" />
        </div>
      );
    else
      render = (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '80%' }}>
          <div className="text-center">
            <i className="fas fa-bell" style={{ fontSize: 80, color: '#ccc' }} />
            <div className="mt-4" style={{ fontSize: 16, color: '#777' }}>
              There are no notifications
            </div>
          </div>
        </div>
      );
  } else
    render = (
      <div>
        {notifications.data.map((item: ItemNotificationType) => {
          const Render = mappingType[item.type];
          return <Render key={item.id} {...item} />;
        })}
      </div>
    );

  return (
    <div ref={ref} className={`noti-drop-down ${show ? 'active' : 'hide'}`}>
      <div className="noti-title">Notifications</div>
      {render}
    </div>
  );
};

export default NotificationsDropDown;
