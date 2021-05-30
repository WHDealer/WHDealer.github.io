import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HBIcon } from '../../../hbBaseClass';
import './Sidebar.scss';
import { useSelector } from 'react-redux';
import { defaultAvatar } from '../../../extensions';

interface Props {
  show: boolean;
  setShow: any;
  navlinkItems: { value: string; active: boolean; link: string; show: boolean; icon: any }[];
  profileItems: { icon: string; label: string; show: boolean; callback: any }[];
}

const Sidebar: React.FC<Props> = (props) => {
  const { show, setShow, navlinkItems, profileItems } = props;
  const [showProfile, setShowProfile] = useState(false);

  const avatar = useSelector((state: any) => state.auth.avatar);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (show) {
      // document.body.style.overflow = 'hidden';
      document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
    } else {
      // document.body.style.overflow = 'unset';
      document.getElementsByTagName('html')[0].style.overflowY = 'overlay';
    }
  }, [show]);

  if (!show) return <div style={{ position: 'absolute' }} />;

  return (
    <div className="hb-sidebar-wrapper">
      <div className="hb-sidebar">
        <div className="hb-sidebar-header">
          <div className="hb-menubar" onClick={handleClose}>
            <i className="hb-icon-close" />
            <div style={{ marginLeft: 4 }}>Menü</div>
          </div>
        </div>
        {navlinkItems
          .filter((item) => item.show)
          .map((item) => (
            <Link
              onClick={handleClose}
              key={item.value}
              className={`hb-sidebar-navlink ${item.active ? 'active' : ''}`}
              to={item.link}
            >
              <div className="d-flex align-items-center">
                <div style={{ marginRight: 14, width: 30, height: 30 }}>
                  <HBIcon name={item.icon} filled={item.active} />
                </div>
                <div
                  className="hb-sidebar-label"
                  style={{ color: item.active ? 'var(--violet-120)' : 'var(--petrol-100)' }}
                >
                  {item.value}
                </div>
              </div>
            </Link>
          ))}
        <div className="hb-sidebar-navlink" onClick={() => setShowProfile(!showProfile)}>
          <div className="d-flex align-items-center">
            <div
              style={{
                marginRight: 14,
                width: 30,
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <i
                className={`hb-icon-angle-down angle-down ${showProfile ? 'rotate' : ''}`}
                style={{ color: '#005f71', fontSize: 10 }}
              />
            </div>
            <div className="hb-sidebar-label" style={{ color: 'var(--petrol-100)' }}>
              Profil
            </div>
          </div>
          <img src={avatar || defaultAvatar} style={{ width: 40, height: 40, borderRadius: '50%' }} alt="avatar" />
        </div>
        <div className={`hb-sidebar-profile ${showProfile ? 'show' : ''}`}>
          {profileItems
            .filter((item) => item.show)
            .map((item) => (
              <div
                key={item.label}
                className="hb-sidebar-profile-item"
                onClick={() => {
                  handleClose();
                  item.callback();
                }}
              >
                <div className="hb-sidebar-profile-item-div">
                  <i className={`${item.icon} hb-sidebar-profile-icon`} />
                  {item.label}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
