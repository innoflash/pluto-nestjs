import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn } from 'typeorm';

export class UserEntity extends AbstractBaseEntity<UserEntity> {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
