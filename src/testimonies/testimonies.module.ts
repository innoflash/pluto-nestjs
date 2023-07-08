import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimony } from './entities/testimony.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testimony])
  ]
})
export class TestimoniesModule {
}
