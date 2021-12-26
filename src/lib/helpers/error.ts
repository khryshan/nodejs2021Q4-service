import { FastifyReply, FastifyRequest, FastifyError } from 'fastify';

export const handleAllErrors = (
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) => {
  reply.log.error(error.message);
  reply.status(error.statusCode || 500).send(error);
}