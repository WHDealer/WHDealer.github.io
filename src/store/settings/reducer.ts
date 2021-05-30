import { CHANGE_SETTING } from './actions'

const initialState = {};

export const settingsReducer = (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case CHANGE_SETTING:
            return { ...state, ...action.payload }
        default:
            return state;
    }
};