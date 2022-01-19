import { createConnection, Connection } from 'typeorm';
import fp from 'fastify-plugin';

import { logger } from '../common/logger';

const connectDB = async (): Promise<Connection> => (
  createConnection()
    .then(async (connection) => {
      await connection.runMigrations();
      logger.info('Connected to database successfully! 🔗');
      return connection;
  })
)

export default fp(async (server: { decorate: (arg0: string, arg1: Connection) => void; }) => {
  try {
    server.decorate("db", await connectDB());
  } catch (error) {
    logger.error(error)
  }
}, '3.x');

