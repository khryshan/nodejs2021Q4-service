import { FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import app from '../../app';


export const handleAllErrors = (
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
): void => {
  reply.log.error(error.message);
  reply.status(error.statusCode || 500).send(error);
};

export const handleFatalError = (error: Error):void => {
  app.log.fatal(error.message);
  process.exit(1);
};
