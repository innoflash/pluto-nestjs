import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { MediaPlatform } from '@pluto/social-media/media-platform';
import { Column, Entity } from 'typeorm';

@Entity()
export class SocialMedia extends AbstractBaseEntity<SocialMedia> {
  @Column({ unique: true })
  platform: MediaPlatform;

  @Column({ default: 0 })
  unitLeft: number;

  @Column({ default: 0 })
  unitRight: number;
}
