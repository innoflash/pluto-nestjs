import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MediaPlatform } from '../../social-media/media-platform';
import { SocialMedia } from '../../social-media/social-media.entity';

export default class SocialMediaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    return Promise.all(
      Object.values(MediaPlatform).map(platform =>
        factoryManager.get(SocialMedia).save({ platform })
      )
    );
  }
}
