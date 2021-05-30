export const LOADING_REQUEST = 'LOADING_REQUEST';
export const LOADING_SUCCESS = 'LOADING_SUCCESS';

export const loadingRequest = () => {
  return { type: LOADING_REQUEST };
};

export const loadingSuccess = () => {
  return { type: LOADING_SUCCESS };
};
