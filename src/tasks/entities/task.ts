import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '@pluto/users/entities/user';

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