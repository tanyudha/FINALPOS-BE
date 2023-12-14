export const VALIDATE_DATE = {
  isDate: true,
};
// functions

export const validation = (args, msg) => ({
  args,
  msg,
});

export const ALPHANUM_REGEX = /^[a-zA-Z0-9 ]+$/i;
export const PHONENUM_REGEX = /^[0-9]*$/i;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/i;
