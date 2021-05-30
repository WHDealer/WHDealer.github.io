import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import MenuBar from '../../../assets/images/MenuBar.svg';
import { useHistory } from 'react-router-dom';
import { defaultAvatar } from '../../../extensions';

interface Props {
  profileItems: { icon: string; label: string; show: boolean; callback: any }[];
}

const ProfileDropdown: React.FC<Props> = (props) => {
  const { profileItems } = props;
  const auth = useSelector(
    (state: { auth: { group_name: string; status_name?: string; avatar: string } }) => state.auth,
  );
  const history = useHistory();

  const groupName = auth.group_name;
  const avatar = auth.avatar;

  return (
    <CDropdown className="c-header-nav-items mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="hb-profile-dropdown-wrapper">
          <div
            style={{
              backgroundImage: `url(${MenuBar})`,
              width: 13,
              height: 9,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <img className="hb-profile-dropdown-avatar" src={avatar || defaultAvatar} />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="hb-dropdown-menu" placement="bottom-end">
        <div className="hb-dropdown-arrow-up" />
        <div className="hb-dropdown-items">
          {profileItems
            .filter((item) => item.show)
            .map((item) => (
              <CDropdownItem key={item.label} className="hb-dropdown-item" onClick={item.callback}>
                <div className="hb-dropdown-item-div">
                  <i className={`${item.icon} hb-dropdown-icon`} />
                  {item.label}
                </div>
              </CDropdownItem>
            ))}
        </div>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default ProfileDropdown;
