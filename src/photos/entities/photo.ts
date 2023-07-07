import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '@pluto/users/entities/user';

@Entity('photos')
export class Photo extends AbstractBaseEntity<Photo> {
  @Column()
  url: string;

  @Column()
  caption: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.photos, { onDelete: 'CASCADE' })
  user: User;
}
