import { ls, jwt } from './extensions';
import config from './config';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/de';

moment.locale('de');

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const isDev = () => {
  return development;
};

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = MONTH * 12;

export const timestampToDatetime = (timestamp: number, hasAgo?: boolean) => {
  const now = new Date().getTime();
  const date = new Date(timestamp * 1000);
  const different = (now - date.getTime()) / 1000;
  if (different < MINUTE) return 'Ein Paar Sekunden';
  const prefix = hasAgo ? 'vor ' : '';
  if (different < MINUTE * 2) return prefix + '1 Minute';
  if (different < HOUR) return prefix + Math.floor(different / MINUTE) + ' Minuten';
  if (different < HOUR * 2) return prefix + '1 Stunde';
  if (different < DAY) return prefix + Math.floor(different / HOUR) + ' Stunden';
  if (different < DAY * 2) return prefix + '1 Tag';
  if (different < WEEK) return prefix + Math.floor(different / DAY) + ' Tage' + (hasAgo ? 'n' : '');
  if (different < WEEK * 2) return prefix + '1 Woche';
  if (different < MONTH) return prefix + Math.floor(different / WEEK) + ' Wochen';
  if (different < MONTH * 2) return prefix + '1 Monat';
  if (different < YEAR) return prefix + Math.floor(different / MONTH) + ' Monate' + (hasAgo ? 'n' : '');
  if (different < YEAR * 2) return prefix + '1 Jahr';
  return prefix + Math.floor(different / YEAR) + ' Jahre' + (hasAgo ? 'n' : '');
};

export const createDate = (dateString: string) => {
  if (!dateString) return null;
  const dateParts = dateString.split('/');
  return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
};

export const formatDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const includes = (arr: any[], item: any) => {
  // return arr.filter((i: any) => i.id === item.id).length > 0;
  return arr.findIndex((i: any) => i.id === item.id) !== -1;
};

export const getUserLS = () => {
  const data = ls.get('data');
  if (data) {
    try {
      const user = jwt.verify(data, config.app.secretKey);
      return user;
    } catch (error) { }
  }
  return null;
};

export const setUserLS = (user: any) => {
  axios.defaults.headers.common['Authorization'] = user.access_token;
  delete user.exp;
  delete user.iat;
  const dataEncoded = jwt.sign(user, config.app.secretKey, {
    expiresIn: config.app.expiresIn,
  });
  ls.set('data', dataEncoded);
};

export const addUserLS = (user: any) => {
  const newUser = getUserLS();
  user = { ...newUser, ...user };
  delete user.exp;
  delete user.iat;
  const dataEncoded = jwt.sign(user, config.app.secretKey, {
    expiresIn: config.app.expiresIn,
  });
  ls.set('data', dataEncoded);
};

export const clearLS = () => {
  axios.defaults.headers.common['Authorization'] = '';
  ls.remove('data');
};

export const getErrorsFromValidationError = (validationError: any) => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors: any, error: any) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
};

export const validate = (getValidationSchema: any) => {
  return (values: any) => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

export const timestampToHour = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return ('0' + date.getHours()).substr(-2) + ':' + ('0' + date.getMinutes()).substr(-2);
};

export const dateToHour = (date: Date) => {
  return ('0' + date.getHours()).substr(-2) + ':' + ('0' + date.getMinutes()).substr(-2);
};

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  if (date.toDateString() === new Date().toDateString()) return 'Today';
  const day = '0' + date.getDate();
  const month = '0' + (date.getMonth() + 1);
  const year = date.getFullYear();
  return day.substr(-2) + '.' + month + '.' + year;
};

export const secondsToDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  let ret = '';
  if (h > 0) ret += h + 'h';
  if (m > 0) ret += (ret !== '' ? ' ' : '') + m + 'm';
  if (s > 0) ret += (ret !== '' ? ' ' : '') + s + 's';
  return ret;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeWordsRegex = (string: string) => {
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

export const capitalizeWords = (string: string) => {
  if (!string) return '';
  return string
    .split(' ')
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .reduce((x, y) => x + ' ' + y);
};

const pageSize = 10;

export const addNo = (item: any, index: number, page: number) => {
  return { ...item, no: index + 1 + pageSize * (page - 1) };
};

export const intToString = (num: any) => {
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1E3, s: "T" },
    { v: 1E6, s: "M" },
    { v: 1E9, s: "B" },
    { v: 1E12, s: "T" },
    { v: 1E15, s: "P" },
    { v: 1E18, s: "E" }
  ];
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].v) {
      break;
    }
  }
  let shortenNumber: any = 0;
  shortenNumber = (num / si[i].v)
  let checkNumber = shortenNumber.toString().split(".");
  if (checkNumber[0].length >= 2) { return checkNumber[0] + si[i].s }
  else if (checkNumber[0].length < 2 && Number(checkNumber[1]) < 100) {
    return Math.trunc(shortenNumber) + si[i].s
  }
  return shortenNumber.toString().replace(".", ",").slice(0, 3) + si[i].s;


}

