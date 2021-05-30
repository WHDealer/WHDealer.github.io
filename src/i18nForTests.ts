import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  // debug: true,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: require('./locales/en/translation.json') },
    de: { translation: require('./locales/de/translation.json') },
  },
});

export default i18n;
