export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARNING = 'warning';

export const CALL_API_REQUEST = 'CALL_API_REQUEST';

export const callApiAction = (
  payload: {
    method: 'get' | 'post' | 'put' | 'delete';
    api: string;
    body?: any;
    loading?: boolean;
    msg?: string;
    refreshed?: boolean;
  },
  callback?: (result: {
    code: number;
    id?: string;
    status?: 'success' | 'error' | 'warning';
    text?: string;
    data?: any;
  }) => void,
) => {
  return { type: CALL_API_REQUEST, payload, callback };
};
