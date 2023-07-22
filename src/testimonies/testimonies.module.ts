import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimony } from './entities/testimony.entity';
import { TestimoniesController } from './testimonies.controller';
import { TestimoniesService } from './testimonies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testimony])
  ],
  controllers: [TestimoniesController],
  providers: [TestimoniesService]
})
export class TestimoniesModule {
}
