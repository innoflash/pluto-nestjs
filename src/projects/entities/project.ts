import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ProjectStatus } from '@pluto/projects/project-status';
import { User } from '@pluto/users/entities/user';

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

  @ManyToMany(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  @JoinTable({
    joinColumn: { name: 'projectId' },
    inverseJoinColumn: { name: 'userId' }
  })
  members: User[];
}
