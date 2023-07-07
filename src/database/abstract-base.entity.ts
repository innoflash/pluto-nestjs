import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractBaseEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  public constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
