import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { loadingReducer } from './loading/reducer';
import { sessionReducer } from './session/reducer';
import { toastsReducer } from './toasts/reducer';
import { authReducer } from './auth/reducer';
import { notificationsReducer } from './notifications/reducer';
import { commonReducer } from './common/reducer';
import { newsfeedReducer } from './newsfeed/reducer';
import { settingsReducer } from './settings/reducer';
import { watcherCallApi } from './callApi/saga';
import { all } from 'redux-saga/effects';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

export const history = require('history').createBrowserHistory();

const reduxRouterMiddleware = routerMiddleware(history);

const rootReducer = combineReducers({
  loading: loadingReducer,
  session: sessionReducer,
  toasts: toastsReducer,
  auth: authReducer,
  notifications: notificationsReducer,
  common: commonReducer,
  newsfeed: newsfeedReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([watcherCallApi()]);
}

const enhancers = [sagaMiddleware, reduxRouterMiddleware];

if (process.env.NODE_ENV !== 'production') {
  enhancers.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...enhancers));

sagaMiddleware.run(rootSaga);
