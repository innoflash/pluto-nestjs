import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Testimony } from './entities/testimony.entity';
import { TestimoniesController } from './testimonies.controller';
import { TestimoniesService } from './testimonies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Testimony]), SharedModule],
  controllers: [TestimoniesController],
  providers: [TestimoniesService]
})
export class TestimoniesModule {}
