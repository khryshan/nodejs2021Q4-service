import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const genHashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(`${password}`, SALT_ROUNDS);

  return hash;
};

export const validatePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const result = await bcrypt.compare(`${password}`, hash);

  return result;
};
