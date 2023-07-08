import { setSeederFactory } from 'typeorm-extension';
import { Photo } from '../../photos/entities/photo.entity';

export default setSeederFactory(Photo, faker => {
  return new Photo({
    url: faker.image.urlPicsumPhotos(),
    caption: faker.lorem.sentence()
  });
});
