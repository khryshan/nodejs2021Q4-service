import pino, { Logger, TransportMultiOptions } from 'pino';
import { FastifyReply, FastifyRequest } from 'fastify';
import { LOG_LEVEL } from './app.config';

const transport = pino.transport(<TransportMultiOptions>{
  level: LOG_LEVEL,
  serializers: {
    res(reply: FastifyReply) {
      return {
        statusCode: reply.statusCode,
      };
    },
    req(request: FastifyRequest) {
      return {
        method: request.method,
        url: request.url,
        params: request.params,
      };
    },
  },
  targets: [
    {
      level: 'info',
      target: 'pino-pretty',
      options: {
        destination: './logs/logs.log',
        mkdir: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname,reqId',
        singleLine: true,
      },
    },
    {
      level: 'error',
      target: 'pino-pretty',
      options: {
        destination: './logs/errors.log',
        mkdir: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname,reqId',
        singleLine: true,
      },
    },
    {
      target: 'pino-pretty',
      level: LOG_LEVEL,
      options: {
        colorize: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname,reqId,responseTime',
        singleLine: true,
      },
    },
  ],
});

export const logger: Logger = pino(transport);
