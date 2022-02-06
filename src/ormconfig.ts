import {ConnectionOptions} from 'typeorm';
import {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
}  from './common/app.config';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'nestjs_db',
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false,

  migrationsRun: true,
  migrations: ["dist/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;