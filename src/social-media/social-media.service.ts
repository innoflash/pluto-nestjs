import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialMedia } from './social-media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocialMediaService {
  public constructor(
    @InjectRepository(SocialMedia)
    private readonly socialMediaRepository: Repository<SocialMedia>
  ) {}

  public list() {
    return this.socialMediaRepository.find();
  }
}
