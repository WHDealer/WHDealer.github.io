import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, history } from './store';
import axios from 'axios';
import config from './config';
import { Router } from 'react-router-dom';
import Loading from './components/loading/Loading';
import Toaster from './components/toast/Toaster';
import SessionCheck from './components/session/SessionCheck';
import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { isDev } from './utils';
import { icons } from './assets/icons';
import metadata from './metadata.json';
import BackToTop from './components/backToTop/BackToTop';
import { closeSocket, openSocket } from './store/common/actions';
import GlobalEvent from 'js-events-listener';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

declare module 'react' {
  let icons: { [key: string]: string | Array<string> };
}

React.icons = icons;

axios.defaults.baseURL = config.api.baseURL;

declare global {
  interface Window {
    client: any;
  }
}

const ConnectSocket = () => {
  const dispatch = useDispatch();

  const access_token = useSelector((state: any) => state.auth.access_token);
  const socket = useSelector((state: any) => state.common.socket);
  const group_name = useSelector((state: any) => state.auth.group_name);
  const [reconnect, setReconnect] = useState(false);

  useEffect(() => {
    if (access_token) {
      if (socket) return;
      if (!group_name?.includes?.('admin')) return;
      const client = new WebSocket(
        'wss://6z8i6kui4m.execute-api.eu-central-1.amazonaws.com/production?token=' + access_token,
      );
      client.onerror = (e) => console.error(e);
      client.onopen = () => {
        console.log('connected');
        client.send('ping');
      };
      client.onclose = () => {
        dispatch(closeSocket());
        console.log('disconnected');
        setTimeout(() => setReconnect(!reconnect), 1000);
      };
      client.onmessage = (e: any) => {
        try {
          let messageStr = e?.data?.replace(/'/g, '"');
          const message = JSON.parse(messageStr);
          console.log(message.topic);
          GlobalEvent.emit(message?.topic, {
            data: message,
          });
        } catch (e) {
          console.log(e);
        }
      };
      dispatch(openSocket(client));
    } else {
      // socket?.disconnect?.();
      dispatch(closeSocket());
    }
  }, [access_token, reconnect]);

  return <div />;
};

const Index = () => {
  const [initializing, setInitializing] = useState(true);

  // const clientRef = useRef<any>(null);
  // const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);

  // useEffect(() => {
  //   if (waitingToReconnect) {
  //     return;
  //   }

  //   if (!clientRef.current) {
  //     const client = new WebSocket('wss://6z8i6kui4m.execute-api.eu-central-1.amazonaws.com/production');
  //     clientRef.current = client;

  //     window.client = client;

  //     client.onerror = (e) => console.error(e);

  //     client.onopen = () => {
  //       console.log('ws opened');
  //       client.send('ping');
  //     };

  //     client.onclose = () => {
  //       if (clientRef.current) {
  //         console.log('ws closed by server');
  //       } else {
  //         console.log('ws closed by app component unmount');
  //         return;
  //       }

  //       if (waitingToReconnect) {
  //         return;
  //       }

  //       console.log('ws closed');

  //       setWaitingToReconnect(true);

  //       setTimeout(() => setWaitingToReconnect(null), 5000);
  //     };

  //     client.onmessage = (e: any) => {
  //       try {
  //         let messageStr = e?.data?.replace(/'/g, '"');
  //         const message = JSON.parse(messageStr);
  //         GlobalEvent.emit(APP_EVENT.VIDEO_STATUS, {
  //           data: message,
  //         });
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     return () => {
  //       console.log('Cleanup');
  //       clientRef.current = null;
  //       client.close();
  //     };
  //   }
  // }, [waitingToReconnect]);

  useEffect(() => {
    const init = async () => {
      let translationEN: any;
      let translationDE: any;

      const initI18n = () => {
        i18n
          .use(detector)
          .use(initReactI18next)
          .init({
            resources: {
              en: {
                translation: translationEN,
              },
              de: {
                translation: translationDE,
              },
            },
            lng: 'en',
            fallbackLng: 'en',
            keySeparator: false,
            interpolation: {
              escapeValue: false,
            },
          });

        setInitializing(false);
      };

      if (!isDev()) {
        Sentry.init({
          dsn: 'https://2fa9501a14c147a5a2ea72b494554d51@o519083.ingest.sentry.io/5646583',
          integrations: [new Integrations.BrowserTracing()],
          tracesSampleRate: 1.0,
        });

        // const loadEN = async () => {
        //   const response = await axios.get('https://hb-storage-1.s3.eu-central-1.amazonaws.com/translation_en.json');
        //   translationEN = response.data;
        // };

        // const loadDE = async () => {
        //   const response = await axios.get('https://hb-storage-1.s3.eu-central-1.amazonaws.com/translation_de.json');
        //   translationDE = response.data;
        // };

        // Promise.all([loadEN(), loadDE()]).then(() => {
        //   initI18n();
        // });
      } else {
        // translationEN = require('./locales/en/translation.json');
        // translationDE = require('./locales/de/translation.json');
        // initI18n();
      }

      translationEN = require('./locales/en/translation.json');
      translationDE = require('./locales/de/translation.json');
      initI18n();
    };

    init();
  }, []);

  if (initializing) return <div />;

  return (
    <React.Fragment>
      <Router history={history}>
        <Provider store={store}>
          <App />
          {/* <MultiLanguage /> */}
          <ConnectSocket />
          <SessionCheck />
          <Loading />
          <Toaster />
        </Provider>
        <BackToTop />
      </Router>

      <div style={{ position: 'fixed', bottom: 12, left: 20, zIndex: 1 }}>
        v{metadata.buildMajor}.{metadata.buildMinor}.0.{metadata.buildRevision}
      </div>
    </React.Fragment>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
