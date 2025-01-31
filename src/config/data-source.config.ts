import { DataSource } from 'typeorm';

import { config } from 'dotenv';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: ['./**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
});
