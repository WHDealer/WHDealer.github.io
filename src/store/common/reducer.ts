import { OPEN_SOCKET, CLOSE_SOCKET } from './actions';

export const commonReducer = (state: any = { socket: null }, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case OPEN_SOCKET:
      return { ...state, socket: payload };
    case CLOSE_SOCKET:
      state.socket?.close();
      return { ...state, socket: null };
    default:
      return state;
  }
};
