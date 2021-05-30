import React, { useEffect, useState } from 'react';
import { CContainer, CRow } from '@coreui/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const VerifyEmail: React.FC<RouteComponentProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const query = new URLSearchParams(props.location?.search);
  const email = query.get('email');
  const code = query.get('code');
  const type = query.get('type');

  const [message, setMessage] = useState<any>({
    text: null,
    button: null,
  });

  const history = useHistory();

  useEffect(() => {
    if (!email || !code || !type) history.push('/sign-in');
    else {
      const body = {
        email: email,
        activate_code: code,
      };

      callApi(
        {
          method: 'post',
          api: config.rest.verifyEmail(),
          body: JSON.stringify(body),
          loading: true,
        },
        (response) => {
          const { id, status, text } = response;
          if (status === SUCCESS) {
            if (id === '10') {
              history.push('/sign-in');
            } else {
              setMessage({
                text: text,
                button: 'signIn',
              });
            }
          } else {
            setMessage({
              text: text,
              button: 'resendEmail',
            });
          }
        },
      );
    }
  }, []);

  const signIn = () => {
    if (type === 'user') history.push('/');
    else history.push('/nurse');
  };

  const resendEmail = () => {
    callApi({
      method: 'get',
      api: config.rest.resendVerifyEmail(email || ''),
      msg: config.messages.resendVerifyEmailFailure,
    });
  };

  if (!message.text) return <div />;

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center" style={{ margin: 15 }}>
          <i className="fa fa-check-circle" style={{ fontSize: 30, color: '#0B98D5' }} />
        </CRow>
        <CRow className="justify-content-center" style={{ margin: 10 }}>
          <h4>{t('email-verification')}</h4>
        </CRow>
        <CRow className="justify-content-center">
          <div style={{ display: 'inline-block' }}>{message.text}</div>
          {message.button && (
            <div
              className="link"
              onClick={message.button === 'signIn' ? signIn : resendEmail}
              style={{ marginLeft: 10, display: 'inline-block' }}
            >
              {message.button === 'signIn' ? t('sign-in') : t('resend-email')}
            </div>
          )}
        </CRow>
      </CContainer>
    </div>
  );
};

export default VerifyEmail;
