export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

export const signIn = (payload: { username: string; password: string }) => {
  return { type: SIGN_IN, payload };
};

export const signOut = () => {
  return { type: SIGN_OUT };
};

export const refreshToken = (payload: string) => {
  return { type: REFRESH_TOKEN, payload };
};

export const updateProfile = (payload: any) => {
  return { type: UPDATE_PROFILE, payload };
}