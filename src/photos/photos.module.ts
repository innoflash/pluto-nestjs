import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '@pluto/photos/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo])
  ]
})
export class PhotosModule {
}
