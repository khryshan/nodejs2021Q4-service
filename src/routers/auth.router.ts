import { FastifyInstance, FastifyPluginAsync } from 'fastify';

import { URLS } from '../lib/constants';
import { authUser } from '../controllers/auth.controller';

const { LOGIN } = URLS;

const loginOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' }
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          token: { type: 'string' },
        },
      }
    },
  },
  handler: authUser
};

/**
 * Declare a route of authentication
 * 
 * @param app {@link FastifyInstance } - instance of framework (fastify)
 * @returns Promise<void>
 */
const authRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
): Promise<void> => {
  app.post(LOGIN, loginOpts)
};

export default authRoutes;



