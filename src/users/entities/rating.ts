import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from 'typeorm';
import { User } from '@pluto/users/entities/user';

@Entity('ratings')
export class Rating extends AbstractBaseEntity<Rating> {
  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.rating, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
