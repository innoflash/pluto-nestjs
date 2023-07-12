import { Injectable } from '@nestjs/common';
import { AbstractCrudService } from '../shared/abstract-crud.service';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService extends AbstractCrudService<Photo> {
  public constructor(
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>
  ) {
    super();
  }

  protected getRepository(): Repository<Photo> {
    return this.photoRepository;
  }
}
