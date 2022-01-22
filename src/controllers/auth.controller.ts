import { FastifyReply, FastifyRequest } from 'fastify';

import { IAuth } from '../types';

type CustomAuthRequest = FastifyRequest<{
  Body: IAuth;
}>;

/**
 * Handles getting list of users and using as reply of the request
 * @param request {@link CustomUsersRequest} - request of query
 * @param reply {@link FastifyReply} - response of query
 * @returns Promise<void>
 */
export const loginUser = async (
  request: CustomAuthRequest,
  reply: FastifyReply
): Promise<void> => {
  // const { login, password } = request.body;

  const data = {
    token: "new-token"
  }
  // const users = await getAllUsers();
  reply.send(data);
};