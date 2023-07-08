import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from '@pluto/social-media/social-media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialMedia])
  ]
})
export class SocialMediaModule {}
