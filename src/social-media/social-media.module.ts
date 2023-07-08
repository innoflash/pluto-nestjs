import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from './social-media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialMedia])
  ]
})
export class SocialMediaModule {}
