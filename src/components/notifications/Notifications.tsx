import React, { useState } from 'react';
import NotificationsDropDown from './NotificationsDropDown';
import './Notifications.css';
import { useSelector } from 'react-redux';

interface Props {}

const Notifications: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const notifications = useSelector((state: any) => state.notifications);

  return (
    <div className="noti-wrapper">
      <div className="cursor-pointer" onClick={() => setShow(true)}>
        <i className={`fas fa-bell noti-bell ${show ? 'active' : ''}`} />
        {notifications.unseen > 0 && <div className="noti-badge">{notifications.unseen}</div>}
      </div>
      <NotificationsDropDown show={show} handleClose={() => setShow(false)} notifications={notifications} />
    </div>
  );
};

export default Notifications;
