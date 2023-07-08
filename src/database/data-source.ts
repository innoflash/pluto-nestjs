import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from './seeds/user.seeder';
import RoleSeeder from './seeds/role.seeder';
import ProfileSeeder from './seeds/profile.seeder';
import UserRoleSeeder from './seeds/user_role.seeder';
import PhotoSeeder from './seeds/photo.seeder';
import TestimonySeeder from './seeds/testimony.seeder';
import TaskSeeder from './seeds/task.seeder';
import ProjectUsersSeeder from './seeds/project-users.seeder';
import ProjectSeeder from './seeds/project.seeder';

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
  seeds: [
    RoleSeeder,
    UserSeeder,
    ProfileSeeder,
    UserRoleSeeder,
    PhotoSeeder,
    TestimonySeeder,
    TaskSeeder,
    ProjectSeeder,
    ProjectUsersSeeder
  ],
  factories: ['src/database/factories/**/*{.ts,.js}']
};

export default new DataSource(dataSourceOptions);
