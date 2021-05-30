import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { Notifications } from '../../../components';
import MenuBar from '../../../assets/images/MenuBar.svg';
import Sidebar from './Sidebar';
import ProfileDropdown from './ProfileDropdown';
import { HBModalConfirm } from '../../../hbBaseClass';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../store/auth/actions';
import { clearLS } from '../../../utils';
import { logoMain } from '../../../extensions';

interface Props {
  pathname: string;
}

const Header: React.FC<Props> = (props) => {
  const [showPopupSignout, setShowPopupSignout] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { pathname } = props;
  const history = useHistory();

  const groupName = useSelector((state: any) => state.auth.group_name);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    setShowPopupSignout(false);
    dispatch(signOut());
    clearLS();
  };

  const navlinkItems = [
    {
      value: 'Magazin',
      active: pathname.includes('/newsfeed'),
      link: '/newsfeed',
      show: groupName !== 'nurse',
      icon: 'newsfeed',
    },
    {
      value: 'Mobilität',
      active: pathname.includes('/mobility'),
      link: '/mobility',
      show: groupName !== 'nurse',
      icon: 'mobility',
    },
    {
      value: 'Beratung',
      active: pathname.includes('/consulting'),
      link: '/consulting',
      show: true,
      icon: 'consulting',
    },
    { value: 'Aktivitäten', active: pathname.includes('/activity'), link: '/activity', show: true, icon: 'activity' },
  ];

  const profileItems = [
    {
      icon: 'hb-icon-calendar-person',
      label: 'Persönliche Angaben',
      show: true,
      callback: () => history.push('/profile'),
    },
    {
      icon: 'hb-icon-file-text',
      label: 'Dokumente',
      show: groupName === 'nurse',
      callback: () => history.push('/nurse-documents'),
    },
    {
      icon: 'hb-icon-creditcard',
      label: 'Ihr Abonnement',
      show: groupName === 'user',
      callback: () => {
        history.push('/mobility/payment');
      },
    },
    {
      icon: 'hb-icon-shield-check',
      label: 'Passwort ändern',
      show: true,
      callback: () => history.push('/change-password'),
    },
    // {
    //   icon: 'hb-icon-bookqueue',
    //   label: 'Meine Rückmeldungen',
    //   show: groupName === 'nurse',
    //   callback: () => history.push('/nurse-feedbacks'),
    // },
    {
      icon: 'hb-icon-lock-2-opened',
      label: 'Abmelden',
      show: true,
      callback: () => setShowPopupSignout(true),
    },
  ];

  return (
    <div style={{ height: 80 }}>
      <div className="hb-tablet">
        <Sidebar show={showSidebar} setShow={setShowSidebar} navlinkItems={navlinkItems} profileItems={profileItems} />
      </div>
      <HBModalConfirm
        show={showPopupSignout}
        handleClose={() => setShowPopupSignout(false)}
        title="Abmelden"
        content="Sie wollen sich von Ihrem Account abmelden?"
        up="Ja, abmelden"
        down="Abbrechen"
        upCallback={handleSignOut}
        downCallback={() => setShowPopupSignout(false)}
      />

      <div className="hb-header">
        <div className="hb-wrapper">
          <div className="d-flex justify-content-between align-items-center hb-mx-20" style={{ height: '100%' }}>
            <Link to="/">{logoMain}</Link>
            <div className="hb-navlinks">
              {navlinkItems
                .filter((item) => item.show)
                .map((item) => (
                  <Link key={item.value} className={`hb-navlink ${item.active ? 'active' : ''}`} to={item.link}>
                    {item.value}
                    {item.active && <div className="hb-navlink-circle"></div>}
                  </Link>
                ))}
            </div>
            <div className="hb-dropdown-profile">
              <ProfileDropdown profileItems={profileItems} />
            </div>
            <div className="hb-menubar" onClick={() => setShowSidebar(true)}>
              <div
                style={{
                  backgroundImage: `url(${MenuBar})`,
                  width: 13,
                  height: 9,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  marginRight: 8,
                }}
              />
              Menü
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
