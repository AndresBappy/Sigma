import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export const generateHash = (password: string): string => {
  return hashSync(password, genSaltSync(8));
};

export const validPassword = (password: string, userPassword: string): boolean => {
  return compareSync(password, userPassword);
};
