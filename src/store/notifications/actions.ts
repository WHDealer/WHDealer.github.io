import { callApiAction, SUCCESS } from '../callApi/actions';

export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const LOADING_NOTIFICATIONS = 'LOADING_NOTIFICATIONS';

const sampleData = [
  {
    id: Math.random().toString(),
    type: 'friend_request_accepted',
    body: 'Chu Minh Quy accepted your friend request.',
    created_date: 1618060629,
    is_read: true,
  },
  {
    id: Math.random().toString(),
    type: 'friend_request_accepted',
    body: 'Ly Van Chan accepted your friend request.',
    created_date: 1618050629,
    is_read: true,
  },
];

export const fetchNotifications = (dispatch: any, page: number) => {
  dispatch({ type: LOADING_NOTIFICATIONS });
  // dispatch({ type: FETCH_NOTIFICATIONS, payload: {data: [], page: 1} });
  dispatch(
    callApiAction(
      { method: 'get', api: `/api/v1/devices/notifications?page=${page}&page_size=10` },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          dispatch({ type: FETCH_NOTIFICATIONS, payload: { data: [...data, ...sampleData], page } });
        }
      },
    ),
  );
};

export const clearNotifications = (dispatch: any) => {
  dispatch({ type: CLEAR_NOTIFICATIONS });
};

export const addNotification = (dispatch: any, payload: any) => {
  dispatch({ type: ADD_NOTIFICATION, payload });
};
