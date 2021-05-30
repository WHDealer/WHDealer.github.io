import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PopupSessionExpired from './PopupSessionExpired';
import { sessionActive } from '../../store/session/actions';
import { clearLS } from '../../utils';

const SessionCheck = () => {
  const sessionExpired = useSelector((state: { session: boolean }) => !state.session);
  const auth = useSelector((state: { auth: any }) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const location: any = {
    user: '/sign-in',
    nurse: { pathname: '/sign-in', state: false },
    admin: '/admin/sign-in',
    superadmin: '/admin/sign-in',
  };

  return (
    <PopupSessionExpired
      show={sessionExpired}
      handleClose={() => {
        dispatch(sessionActive());
        clearLS();
        history.push(location[auth.group_name]);
      }}
    />
  );
};

export default SessionCheck;
