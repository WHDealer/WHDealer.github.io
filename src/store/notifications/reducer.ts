import { FETCH_NOTIFICATIONS, CLEAR_NOTIFICATIONS, ADD_NOTIFICATION, LOADING_NOTIFICATIONS } from './actions';

const initialState = { data: [], loading: false, full: false, page: 0, unseen: 0 };

export const notificationsReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_NOTIFICATIONS:
      const { data, page } = payload;
      const full = data.length < 10 ? true : false;
      return { ...state, data: [...state.data, ...data], loading: false, full, page };
    case CLEAR_NOTIFICATIONS:
      return initialState;
    case ADD_NOTIFICATION:
      return { ...state, data: [payload, ...state.data], unseen: state.unseen + 1 };
    case LOADING_NOTIFICATIONS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
