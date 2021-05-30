import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { CALL_API_REQUEST, ERROR, SUCCESS, callApiAction } from './actions';
import { loadingRequest, loadingSuccess } from '../loading/actions';
import { createToast } from '../toasts/actions';
import { sessionExpire } from '../session/actions';
import config from '../../config';
import { getUserLS, setUserLS } from '../../utils';
import { refreshToken } from '../auth/actions';
import * as Sentry from '@sentry/browser';

const getApi: any = (api: string) => axios.get(api);
const postApi: any = (api: string, data: any) => axios.post(api, data);
const putApi: any = (api: string, data: any) => axios.put(api, data);
const deleteApi: any = (api: string, data?: any) => axios.delete(api, { data });

const mappingApi: any = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
};

function* workerCallApi(action: { payload: any; callback: (result: any) => void; type: string }) {
  const { payload, callback } = action;
  let result: any = {
    code: 500,
    id: '0',
    status: ERROR,
    text: '',
    data: null,
  };
  let refresh = false;
  const { method, api, body, loading, msg } = payload;
  if (loading) yield put(loadingRequest());
  try {
    const response = yield mappingApi[method](api, body);
    const data = response.data;
    result = {
      code: data.code,
      id: data.message.id,
      status: data.message.status,
      text: data.message.text,
      data: data.data,
    };
    if (data.code !== 200) yield put(createToast('Sorry. Something went wrong. Please try again.', ERROR));
    else if (data.message.popup)
      yield put(createToast(data.message.text, data.message.status, data.message.duration * 1000));
  } catch (error) {
    // console.log('Error: ' + error);
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      if (!api.includes('signout')) {
        const user = getUserLS();
        if (user && !payload.refreshed) {
          const groupName = user.group_name;
          const responseRefresh = yield postApi(
            groupName.includes('admin') ? config.rest.refreshTokenAdmin() : config.rest.refreshTokenUser(),
            { refresh_token: user.refresh_token },
          );
          const { data, message } = responseRefresh.data;
          if (message.status === SUCCESS) {
            console.log('Refresh successful');
            const accessToken = data.access_token;
            const user = { ...getUserLS(), access_token: accessToken };
            delete user.exp;
            delete user.iat;
            setUserLS(user);
            yield put(refreshToken(accessToken));
            refresh = true;
            yield put(callApiAction({ ...payload, refreshed: true }, action.callback));
          } else {
            console.log('Refresh failure: ' + user.refresh_token);
            yield put(sessionExpire());
          }
        } else yield put(sessionExpire());
      }
    } else {
      Sentry.captureException(error);
      result = { code: 500, text: msg };
      if (msg) yield put(createToast(msg, ERROR));
    }
  }
  if (!refresh) {
    if (loading) yield put(loadingSuccess());
    callback && callback(result);
  }
}

export function* watcherCallApi() {
  yield takeEvery(CALL_API_REQUEST, workerCallApi);
}
