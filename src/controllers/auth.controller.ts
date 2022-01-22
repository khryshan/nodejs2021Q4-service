import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import { findUserData } from '../repositories/users.memory.repository';
import { validatePassword } from '../lib/helpers/hashHelper';
import { JWT_SECRET_KEY } from '../common/config';
import { IAuth } from '../types';

type CustomAuthRequest = FastifyRequest<{
  Body: IAuth;
}>;


/**
 * Handles getting user token
 * @param {string} loginUser - user login
 * @param {string} password - user password
 * @returns Promise<string | null>
 */
const getUserToken = async (loginUser: string, password: string): Promise<string | null> => {
  const user = await findUserData(loginUser || '');

  if(!user) return null;

  const { id: userId, login, password: hashedPassword = '' } = user;
  const isValidePassword = await validatePassword(password, hashedPassword);

  if(!isValidePassword) return null;

  const token = jwt.sign({ userId, login }, JWT_SECRET_KEY);

  return token;
}

/**
 * Handles getting list of users and using as reply of the request
 * @param request {@link CustomUsersRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const authUser = async (
  request: CustomAuthRequest,
  reply: FastifyReply
): Promise<void> => {
  const { login = '', password = '' } = request.body;

  const token = await getUserToken(login, password);
  
  if(!token) {
    reply.code(403).send({message: 'Access forbidden: wrong login or password'});
  } else {
    reply.code(200).send({token});
  }
};