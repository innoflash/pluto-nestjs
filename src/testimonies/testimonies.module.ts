import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimony } from '@pluto/testimonies/entities/testimony.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testimony])
  ]
})
export class TestimoniesModule {
}
