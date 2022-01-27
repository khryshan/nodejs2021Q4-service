import { ConnectionOptions } from "typeorm";
import {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
}  from './src/common/config';

export default {
  type: "postgres",
  host: "db",
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ["src/db/entities/**/*.ts"],
  migrations: ["src/db/migration/**/*.ts"],
  subscribers: ['src/db/subscriber/**/*.ts'],
  cli: {
    entitiesDir: "src/db/entities",
    migrationsDir: "src/db/migration",
    subscribersDir: "src/db/subscriber",
  }
} as ConnectionOptions;