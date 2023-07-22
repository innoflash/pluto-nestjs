import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../shared/base-crud.service';
import { Testimony } from './entities/testimony.entity';

@Injectable()
export class TestimoniesService extends BaseCrudService<Testimony> {
  public constructor(
    @InjectRepository(Testimony)
    private readonly testimoniesRepository: Repository<Testimony>
  ) {
    super();
  }

  protected getRepository(): Repository<Testimony> {
    return this.testimoniesRepository;
  }
}
