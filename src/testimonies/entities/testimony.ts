import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '@pluto/users/entities/user';

@Entity('testimonies')
export class Testimony extends AbstractBaseEntity<Testimony> {
  @Column({ type: 'text' })
  testimony: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.testimonies, { onDelete: 'CASCADE' })
  user: User;
}
