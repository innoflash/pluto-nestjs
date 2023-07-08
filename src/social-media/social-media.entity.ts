import { Column, Entity } from 'typeorm';
import { AbstractBaseEntity } from '../database/abstract-base.entity';
import { MediaPlatform } from './media-platform';

@Entity()
export class SocialMedia extends AbstractBaseEntity<SocialMedia> {
  @Column({ unique: true })
  platform: MediaPlatform;

  @Column({ default: 0 })
  unitLeft: number;

  @Column({ default: 0 })
  unitRight: number;
}
