export const OPEN_SOCKET = 'OPEN_SOCKET';
export const CLOSE_SOCKET = 'CLOSE_SOCKET';

export const openSocket = (socket: any) => {
  return { type: OPEN_SOCKET, payload: socket };
};

export const closeSocket = () => {
  return { type: CLOSE_SOCKET };
};