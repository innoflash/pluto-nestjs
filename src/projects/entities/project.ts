import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import { ProjectStatus } from '@pluto/projects/project-status';

@Entity('projects')
export class Project extends AbstractBaseEntity<Project> {
  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, default: ProjectStatus.DRAFT })
  status: ProjectStatus;

  @Column({ type: 'number', default: 0 })
  progress: number;

  @CreateDateColumn()
  createdAt: Date;
}
