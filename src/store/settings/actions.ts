export const CHANGE_SETTING = 'CHANGE_SETTING';

export const changeSetting = (payload: any) => {
    return { type: CHANGE_SETTING, payload };
};