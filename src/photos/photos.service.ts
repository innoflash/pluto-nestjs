import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseCrudService } from '../shared/base-crud.service';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService extends BaseCrudService<Photo> {
  public constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    protected readonly moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  protected getRepository(): Repository<Photo> {
    return this.photoRepository;
  }
}
