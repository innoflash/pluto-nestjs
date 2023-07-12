import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../shared/base-crud.service';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService extends BaseCrudService<Photo> {
  public constructor(
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>
  ) {
    super();
  }

  protected getRepository(): Repository<Photo> {
    return this.photoRepository;
  }
}
