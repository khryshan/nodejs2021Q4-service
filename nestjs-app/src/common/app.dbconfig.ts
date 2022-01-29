import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
}  from './app.config';

export function getTypeOrmConfig(): TypeOrmModuleOptions{
  return({
     type: "postgres",
     host: "nestjs_db",
     port: 5432,
     username: POSTGRES_USER,
     password: POSTGRES_PASSWORD,
     database: POSTGRES_DB,
     entities: ["dist/**/*.entity{.ts,.js}"],
     synchronize: true,
  });
}
