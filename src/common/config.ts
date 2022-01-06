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
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY
} = process.env;

export const PORT: string | number = process.env.PORT || 4000;

export const LOG_LEVEL: string = LogLevels[process.env.LOG_LEVEL as keyof typeof LogLevels || '4'];

export const AUTH_MODE: boolean = process.env.AUTH_MODE === 'true';


