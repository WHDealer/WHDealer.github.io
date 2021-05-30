export const SESSION_ACTIVE = 'SESSION_ACTIVE';
export const SESSION_EXPIRE = 'SESSION_EXPIRE';

export const sessionActive = () => {
  return { type: SESSION_ACTIVE };
};

export const sessionExpire = () => {
  return { type: SESSION_EXPIRE };
};
