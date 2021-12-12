import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const {
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY
} = process.env;

export const PORT: string | number = process.env.PORT || 4000;

export const AUTH_MODE: boolean = process.env.AUTH_MODE === 'true';


