import bcrypt from 'bcrypt';

import {SALT_ROUNDS} from '../constants';

export const genHashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const validatePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, hash);
  
  return result;
}
