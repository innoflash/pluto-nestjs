import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('photos')
export class Photo extends AbstractBaseEntity<Photo> {
  @Column()
  url: string;

  @Column()
  caption: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'number' })
  userId: number;

  @ManyToOne(() => User, user => user.photos, { onDelete: 'CASCADE' })
  user: User;
}
