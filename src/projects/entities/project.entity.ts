import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { ProjectStatus } from '../project-status';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('projects')
export class Project extends AbstractBaseEntity<Project> {
  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, default: ProjectStatus.DRAFT })
  status: ProjectStatus;

  @Column({ default: 0 })
  progress: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => User, user => user.projects, { onDelete: 'CASCADE' })
  @JoinTable({
    joinColumn: { name: 'projectId' },
    inverseJoinColumn: { name: 'userId' }
  })
  members: User[];
}
