import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('tasks')
export class Task extends AbstractBaseEntity<Task> {
  @Column({ type: 'text' })
  task: string;

  @CreateDateColumn()
  startTime: Date;

  @CreateDateColumn()
  endTime: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  user: User;
}