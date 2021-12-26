import pino from 'pino';
import { FastifyReply, FastifyRequest } from 'fastify';

const config = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname,reqId,responseTime',
      singleLine: true,
    },
  },
  serializers: {
    res (reply: FastifyReply) {        
      return {
        statusCode: reply.statusCode,
      }
    },
    req (request: FastifyRequest) {
      return {
        method: request.method,
        url: request.url,
        params: request.params,
      };
    },
    // err (error: FastifyError) {
    //   return {
    //     message: error.message,
    //     statusCode: error.statusCode,
    //   }
    // }
  },
};

export const parserReqBody = (request: FastifyRequest, _: FastifyReply, done: () => void) => {
  if (request.body) {
    request.log.info({ body: request.body }, 'parsed request body')
  }
  done();
};


export const logger = pino(config);