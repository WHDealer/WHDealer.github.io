import React, { useState } from 'react';
import { CImg, CNav, CNavItem, CNavLink, CSidebar, CSidebarNav } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { signOut } from '../../../store/auth/actions';
import { clearLS } from '../../../utils';
import { Link, useHistory } from 'react-router-dom';
import logo from './logo.png';
import { ConfirmPopup } from '../../../components';

interface Props {
  location: any;
}

const Header: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { location } = props;

  const [showSidebar, setShowSidebar] = useState(false);

  const auth = useSelector((state: any) => state.auth);
  const isAdmin = auth.group_name === 'admin';
  const history = useHistory();
  const dispatch = useDispatch();

  const [popupSignout, setPopupSignout] = useState(false);

  const openSidebar = () => setShowSidebar(true);
  const closeSidebar = () => setShowSidebar(false);

  const handleSignOut = () => {
    dispatch(signOut());
    history.push('/admin/sign-in');
    clearLS();
  };

  let type = '';
  const { pathname, search } = location;

  if (pathname.includes('users')) {
    if (search.includes('type=nurse')) {
      if (search.includes('status=1')) type = 'pending';
      else type = 'nurse';
    } else if (search.includes('type=user')) type = 'user';
    else type = 'admin';
  }

  return (
    <>
      <ConfirmPopup
        hideTitle
        centered
        btnWidth={120}
        isVisible={popupSignout}
        content="Do you want to sign out?"
        leftButtonText="No"
        rightButtonText="Yes"
        leftButtonOnPress={() => setPopupSignout(false)}
        rightButtonOnPress={handleSignOut}
      />

      <i className="fas fa-bars size-1 cursor-pointer admin-toggle-button" onClick={openSidebar} />

      <CSidebar size="lg" overlaid show={showSidebar} onShowChange={closeSidebar}>
        <div className="admin-profile" onClick={closeSidebar}>
          <CImg
            onClick={() => history.push('/admin/profile')}
            className="admin-avatar--img my-3 cursor-pointer"
            src={auth.avatar || logo}
            alt="Avatar"
            width="128"
            height="128"
          />
          <span className="admin-display-name">
            {auth.first_name} {auth.last_name}
          </span>
          {showSidebar && <i className="fas fa-angle-left hb-close-sidebar" />}
        </div>

        <CNav variant="pills">
          <CSidebarNav>
            <CNavItem className="px-3 d-compact-none c-d-minimized-none">
              <CNavLink className="hb-navlink" onClick={closeSidebar} to="/admin/newsfeed">
                <i className="fas fa-book hb-navlink-icon" />
                Newsfeed
              </CNavLink>
            </CNavItem>

            <CNavItem className="px-3 d-compact-none c-d-minimized-none hb-navlink">
              <CNavLink
                className="hb-navlink"
                onClick={() => {
                  closeSidebar();
                  history.push('/admin/mobility/videos');
                }}
              >
                <i className="fab fa-youtube hb-navlink-icon" />
                Mobility
              </CNavLink>
            </CNavItem>
            <div className="ml-4">
              <CNavItem className="px-3 d-compact-none c-d-minimized-none">
                <CNavLink className="hb-navlink" onClick={closeSidebar} to="/admin/mobility/videos">
                  <i className="fas fa-angle-right hb-navlink-icon" />
                  Video Management
                </CNavLink>
              </CNavItem>
              <CNavItem className="px-3 d-compact-none c-d-minimized-none">
                <CNavLink className="hb-navlink" onClick={closeSidebar} to="/admin/mobility/categories">
                  <i className="fas fa-angle-right hb-navlink-icon" />
                  Category Management
                </CNavLink>
              </CNavItem>
              <CNavItem className="px-3 d-compact-none c-d-minimized-none">
                <CNavLink className="hb-navlink" onClick={closeSidebar} to="/admin/mobility/trainers">
                  <i className="fas fa-angle-right hb-navlink-icon" />
                  Trainer Management
                </CNavLink>
              </CNavItem>
            </div>

            <CNavItem className="px-3 d-compact-none c-d-minimized-none">
              <CNavLink className="hb-navlink" onClick={closeSidebar} to="/admin/communication">
                <i className="fas fa-microphone hb-navlink-icon" />
                Communication
              </CNavLink>
            </CNavItem>

            <CNavItem className="px-3 d-compact-none c-d-minimized-none">
              <CNavLink className="hb-navlink" onClick={closeSidebar} to="/admin/consulting">
                <i className="fas fa-phone-alt hb-navlink-icon" />
                Consulting
              </CNavLink>
            </CNavItem>

            <CNavItem className="px-3 d-compact-none c-d-minimized-none">
              <Link className="nav-link hb-navlink" onClick={closeSidebar} to="/admin/users">
                <i className="fa fa-users hb-navlink-icon" />
                {t('user-management')}
              </Link>
            </CNavItem>
            <div className="ml-4">
              <CNavItem className="px-3 d-compact-none c-d-minimized-none">
                <Link
                  className={`nav-link hb-navlink ${type === 'admin' ? 'active' : ''}`}
                  onClick={closeSidebar}
                  to="/admin/users"
                >
                  <i className="fas fa-angle-right hb-navlink-icon" />
                  Admin
                </Link>
              </CNavItem>
              <CNavItem className="px-3 d-compact-none c-d-minimized-none">
                <Link
                  className={`nav-link hb-navlink ${type === 'nurse' ? 'active' : ''}`}
                  onClick={closeSidebar}
                  to="/admin/users?type=nurse"
                >
                  <i className="fas fa-angle-right hb-navlink-icon" />
                  Nurse
                </Link>
              </CNavItem>
              <div className="ml-4">
                <CNavItem className="px-3 d-compact-none c-d-minimized-none">
                  <Link
                    className={`nav-link hb-navlink ${type === 'pending' ? 'active' : ''}`}
                    onClick={closeSidebar}
                    to="/admin/users?type=nurse&amp;status=1"
                  >
                    <i className="fas fa-angle-right hb-navlink-icon" />
                    Pending Approval
                  </Link>
                </CNavItem>
              </div>
              <CNavItem className="px-3 d-compact-none c-d-minimized-none">
                <Link
                  className={`nav-link hb-navlink ${type === 'user' ? 'active' : ''}`}
                  onClick={closeSidebar}
                  to="/admin/users?type=user"
                >
                  <i className="fas fa-angle-right hb-navlink-icon" />
                  Basic Member
                </Link>
              </CNavItem>
            </div>

            {!isAdmin && (
              <CNavItem className="px-3 d-compact-none c-d-minimized-none">
                <CNavLink className="hb-navlink" onClick={closeSidebar} to="/admin/settings">
                  <i className="fa fa-cogs hb-navlink-icon" />
                  {t('settings')}
                </CNavLink>
              </CNavItem>
            )}

            <CNavItem className="px-3 d-compact-none c-d-minimized-none">
              <CNavLink
                className="hb-navlink"
                onClick={() => {
                  closeSidebar();
                  setPopupSignout(true);
                }}
              >
                <i className="fas fa-sign-out-alt hb-navlink-icon" />
                {t('sign-out')}
              </CNavLink>
            </CNavItem>
          </CSidebarNav>
        </CNav>
      </CSidebar>
    </>
  );
};

export default Header;
