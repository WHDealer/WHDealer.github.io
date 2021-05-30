import { SESSION_ACTIVE, SESSION_EXPIRE } from './actions';

export const sessionReducer = (state = true, action: { type: string }) => {
  switch (action.type) {
    case SESSION_ACTIVE:
      return true;
    case SESSION_EXPIRE:
      return false;
    default:
      return state;
  }
};
