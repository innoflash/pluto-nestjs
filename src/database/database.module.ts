import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.getOrThrow('POSTGRES_DB'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        username: configService.getOrThrow('POSTGRES_USER'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        host: configService.getOrThrow('POSTGRES_HOST'),
        autoLoadEntities: true,
        logging: process.env.NODE_ENV !== 'production',
        synchronize: false
      })
    })
  ]
})
export class DatabaseModule {}
