import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  public listenTo(): Function | string {
    return User;
  }

  public async beforeInsert(event: InsertEvent<User>) {
    const salt = bcrypt.genSaltSync();
    event.entity.password = await bcrypt.hash(event.entity.password, salt);
  }
}