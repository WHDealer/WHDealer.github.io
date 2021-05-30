export const CREATE_TOAST = 'CREATE_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export const createToast = (
  message: string,
  type: 'success' | 'error' | 'warning' = 'success',
  duration: number = 3000,
) => {
  const payload = { message, duration, type };
  return { type: CREATE_TOAST, payload };
};

export const removeToast = (key: number) => {
  return { type: REMOVE_TOAST, payload: key };
};
