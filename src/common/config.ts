import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const LogLevels = {
  '1': "fatal",
  '2': "error",
  '3': "warn",
  '4': "info",
  '5': "debug",
  '6': "trace"
};

export const {
  NODE_ENV,
  MONGO_CONNECTION_STRING
} = process.env;

export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'secret';

export const PORT: string | number = process.env.PORT || 4000;
export const FASTIFY_HOST: string = process.env.FASTIFY_HOST || '';

export const LOG_LEVEL: string = LogLevels[process.env.LOG_LEVEL as keyof typeof LogLevels || '4'];

export const AUTH_MODE: boolean = process.env.AUTH_MODE === 'true';

export const POSTGRES_PORT: string | number = process.env.POSTGRES_PORT || 5432;
export const POSTGRES_USER: string = process.env.POSTGRES_USER || "admin";
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD || "admin";
export const POSTGRES_DB: string = process.env.POSTGRES_DB || "test-postgres-db";


