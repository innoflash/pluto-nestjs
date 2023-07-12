import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';

@Entity('testimonies')
export class Testimony extends AbstractBaseEntity<Testimony> {
  @Column({ type: 'text' })
  testimony: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'number' })
  userId: number;

  @ManyToOne(() => User, user => user.testimonies, { onDelete: 'CASCADE' })
  user: User;
}
