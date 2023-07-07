import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.getOrThrow('POSTGRES_DATABASE'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        username: configService.getOrThrow('POSTGRES_USER'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        host: configService.getOrThrow('POSTGRES_HOST'),
        autoLoadEntities: true,
        logging: true,
        synchronize: true
      })
    })
  ]
})
export class DatabaseModule {
}
