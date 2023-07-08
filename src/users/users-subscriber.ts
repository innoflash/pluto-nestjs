import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { User } from '@pluto/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

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