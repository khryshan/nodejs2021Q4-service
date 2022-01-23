import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from './config';
import { WHITE_LIST_ROUTERS } from '../lib/constants';



export const checkAuthToken = (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { url } = request;
  const isWhiteRoute = WHITE_LIST_ROUTERS.includes(url);

  if(!isWhiteRoute) {
    const authHeader = request.headers.authorization;
    
  
    if (authHeader !== undefined) {
      const [props, token] = authHeader.split(' ');
      
      if (props !== 'Bearer') {
        reply.code(401).send({message: 'Unauthorized user'});
      } else {
        jwt.verify(token, JWT_SECRET_KEY);
      }
    } else {
      reply.code(401).send({message: 'Unauthorized user'});
    } 
  };
};
