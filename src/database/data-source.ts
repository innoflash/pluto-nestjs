import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from './seeds/user.seeder';
import RoleSeeder from './seeds/role.seeder';
import ProfileSeeder from './seeds/profile.seeder';

config();

const configService = new ConfigService();

export const dataSourceOptions: PostgresConnectionOptions & SeederOptions = {
  type: 'postgres',
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  username: configService.getOrThrow('POSTGRES_USER'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  host: configService.getOrThrow('POSTGRES_HOST'),
  logging: true,
  migrations: ['dist/database/migrations/**/*.js'],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  seeds: [RoleSeeder, UserSeeder, ProfileSeeder],
  factories: ['src/database/factories/**/*{.ts,.js}']
};

export default new DataSource(dataSourceOptions);
