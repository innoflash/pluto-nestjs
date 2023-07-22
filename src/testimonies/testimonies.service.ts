import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../shared/base-crud.service';
import { Testimony } from './entities/testimony.entity';

@Injectable()
export class TestimoniesService extends BaseCrudService<Testimony> {
  public constructor(
    @InjectRepository(Testimony)
    private readonly testimoniesRepository: Repository<Testimony>,
    protected readonly moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  protected getRepository(): Repository<Testimony> {
    return this.testimoniesRepository;
  }
}
