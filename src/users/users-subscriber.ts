import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { User } from '@pluto/users/entities/user';

@EventSubscriber()
export class UsersSubscriber implements  EntitySubscriberInterface<User>{
  public listenTo(): Function | string {
    return User;
  }

  public beforeInsert(event: InsertEvent<User>): Promise<any> | void {
    event.entity.password =
  }
}