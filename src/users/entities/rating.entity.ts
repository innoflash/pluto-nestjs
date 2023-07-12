import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  UpdateDateColumn
} from 'typeorm';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';
import { User } from './user.entity';

@Entity('ratings')
export class Rating extends AbstractBaseEntity<Rating> {
  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'number' })
  userId: number;

  @OneToOne(() => User, user => user.rating, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
