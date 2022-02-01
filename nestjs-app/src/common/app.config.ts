type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";


export const PORT: string | number = process.env.PORT || 4000;

export const LOG_LEVEL: LogLevel = process.env.LOG_LEVEL as LogLevel|| 'info';

export const POSTGRES_PORT: string | number = process.env.POSTGRES_PORT || 5432;
export const POSTGRES_USER: string = process.env.POSTGRES_USER || "admin";
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD || "admin";
export const POSTGRES_DB: string = process.env.POSTGRES_DB || "test-nestjs-postgres-db";
