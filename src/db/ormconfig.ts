import { ConnectionOptions } from "typeorm";
import {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
}  from '../common/config';

export default {
  type: "postgres",
  host: "db",
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  entities: [
    "src/db/entities/**/*.ts"
  ],
} as ConnectionOptions;