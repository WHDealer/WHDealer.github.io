import { SIGN_IN, SIGN_OUT, REFRESH_TOKEN, UPDATE_PROFILE } from './actions';

const initialState = {};

export const authReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...action.payload };
    case SIGN_OUT:
      return {};
    case REFRESH_TOKEN:
      return { ...state, access_token: action.payload };
    case UPDATE_PROFILE:
      return { ...state, ...action.payload}
    default:
      return state;
  }
};
