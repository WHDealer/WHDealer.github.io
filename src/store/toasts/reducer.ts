import { CREATE_TOAST, REMOVE_TOAST } from './actions';

let toastKey = 0;

export const toastsReducer = (state = [], action: any) => {
  switch (action.type) {
    case CREATE_TOAST:
      toastKey += 1;
      return [...state, { ...action.payload, key: toastKey }];
    case REMOVE_TOAST:
      return state.filter((s: { key: number }) => s.key !== action.payload);
    default:
      return state;
  }
};
