import { LOADING_REQUEST, LOADING_SUCCESS } from './actions';

export const loadingReducer = (state = false, action: { type: string }) => {
  switch (action.type) {
    case LOADING_REQUEST:
      return true;
    case LOADING_SUCCESS:
      return false;
    default:
      return state;
  }
};
