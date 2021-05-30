import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './scss/style.scss';
import PrivateRouteUser from './privateRoutes/PrivateRouteUser';
import PrivateRouteAdmin from './privateRoutes/PrivateRouteAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from './store/auth/actions';

import { ls, jwt, loading } from './extensions';
import config from './config';
import { messagingBrowser } from './init-fcm';
import axios from 'axios';
import { addNotification } from './store/notifications/actions';
import { changeSetting } from './store/settings/actions';
import { callApiAction, SUCCESS } from './store/callApi/actions';

let messaging: any;
// Regiser service worker for push notification services
if (messagingBrowser.isSupported()) {
  messaging = messagingBrowser();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./firebase-messaging-sw.js')
      .then(function (registration) {
        console.log('Registration successful, scope is:', registration.scope);
      })
      .catch(function (err) {
        console.log('Service worker registration failed, error:', err);
      });
  }
}

// const notificationServices = async () => {
//     messaging.requestPermission()
//     .then(async function() {
//       const token = await messaging.getToken();
//       console.log(token);
//     })
//     .catch(function(err) {
//       console.log("Unable to get permission to notify.", err);
//     });
//   navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
// };

// Pages
const GoogleCalendar = React.lazy(() => import('./views/user/consulting/GoogleCalendar'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const RecoveryPassword = React.lazy(() => import('./views/pages/recoveryPassword/RecoveryPassword'));
const VerifyEmail = React.lazy(() => import('./views/pages/verifyEmail/VerifyEmail'));

// User
const Layout = React.lazy(() => import('./views/user/containers/Layout'));
const SignIn = React.lazy(() => import('./views/user/signIn/SignIn'));
const SignUp = React.lazy(() => import('./views/user/signUp/SignUp'));
const ForgotPassword = React.lazy(() => import('./views/user/forgotPassword/ForgotPassword'));
const InitProfile = React.lazy(() => import('./views/user/initProfile/InitProfile'));
const SureApp = React.lazy(() => import('./views/user/signUp/SureApp'));

// Admin
const LayoutAdmin = React.lazy(() => import('./views/admin/containers/Layout'));
const SignInAdmin = React.lazy(() => import('./views/admin/signIn/SignIn'));
const ResetPasswordAdmin = React.lazy(() => import('./views/admin/resetPassword/ResetPassword'));

const TestBaseClass = React.lazy(() => import('./hbBaseClass/TestBaseClass'));

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [initSetting, setInitSetting] = useState(true);
  const access_token = useSelector((state: any) => state.auth.access_token);

  useEffect(() => {
    if (location.pathname?.includes('sign-in')) ls.remove('data');
  }, [location]);

  const getSetting = () => {
    callApi(
      {
        method: 'get',
        api: config.rest.getSettings(),
      },
      (response: any) => {
        const { data, status } = response;
        setInitSetting(false);
        if (status === SUCCESS) {
          dispatch(changeSetting(data.setting));
        }
      },
    );
  };

  useEffect(() => {
    if (access_token) {
      setInitSetting(true);
      axios.defaults.headers.common['Authorization'] = access_token;
      getSetting();
    } else {
      setInitSetting(false);
    }
  }, [access_token]);

  useEffect(() => {
    // init firebase push notifications

    if (messaging) {
      messaging
        .requestPermission()
        .then(async function () {
          const token = await messaging.getToken();
          // console.log('Quy', token);
          ls.set('push_token', token);
        })
        .catch(function (err: any) {
          console.log('Unable to get permission to notify.', err);
        });
      navigator.serviceWorker.addEventListener('message', (message) => {
        console.log(message);
        const data = message.data?.['firebase-messaging-msg-data']?.notification;
        if (data.title === 'Notification') {
          const body = JSON.parse(data.body);
          addNotification(dispatch, {
            ...body,
            id: Math.random().toString(),
            created_date: new Date().getTime() / 1000,
            is_read: false,
          });
        }
      });
    }

    const data = ls.get('data');
    if (data) {
      try {
        const decoded = jwt.verify(data, config.app.secretKey);
        dispatch(signIn(decoded));
        axios.defaults.headers.common['Authorization'] = decoded.access_token;
        if (decoded.group_name.includes('admin') && location.pathname === '/')
          history.push(config.routes.managerUsers());
      } catch (error) {}
    }

    setIsFirstLoading(false);
  }, []);

  if (isFirstLoading || initSetting) return <div>{loading}</div>;

  return (
    <Suspense fallback={loading}>
      <Switch>
        <Route exact path="/base-class" render={(props) => <TestBaseClass {...props} />} />
        <Route exact path="/google-calendar" render={(props) => <GoogleCalendar {...props} />} />
        <Route exact path="/recovery" render={(props) => <RecoveryPassword {...props} />} />
        <Route exact path="/verify-email" render={(props) => <VerifyEmail {...props} />} />
        <Route exact path="/404" render={(props) => <Page404 {...props} />} />
        <Route exact path="/500" render={(props) => <Page500 {...props} />} />
        <Route exact path="/sign-in" render={(props) => <SignIn {...props} />} />
        <Route exact path="/sign-up" render={(props) => <SignUp {...props} />} />
        <Route exact path="/forgot-password" render={(props) => <ForgotPassword {...props} />} />
        <Route exact path="/init-profile" render={(props) => <InitProfile {...props} />} />
        <Route exact path="/admin/sign-in" component={SignInAdmin} />
        <Route exact path="/admin/reset-password" render={(props) => <ResetPasswordAdmin {...props} />} />
        <Route exact path="/zur-app" component={SureApp} />
        <PrivateRouteAdmin path="/admin" render={(props) => <LayoutAdmin {...props} />} />
        <PrivateRouteUser path="/" render={(props) => <Layout {...props} />} />
      </Switch>
    </Suspense>
  );
};

export default App;
