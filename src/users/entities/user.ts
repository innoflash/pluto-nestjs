import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Role } from '@pluto/users/entities/role';
import { Profile } from '@pluto/users/entities/profile';
import { Testimony } from '@pluto/testimonies/entities/testimony';
import { Project } from '@pluto/projects/entities/project';
import { Rating } from '@pluto/users/entities/rating';
import { Photo } from '@pluto/photos/entities/photo';
import { Task } from '@pluto/tasks/entities/task';

@Entity('users')
export class User extends AbstractBaseEntity<User> {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @OneToOne(() => User, (user) => user.profile)
  profile: Profile;

  @OneToOne(() => Rating, (rating) => rating.user)
  rating: Rating;

  @OneToMany(() => Testimony, (testimony) => testimony.user)
  testimonies: Testimony[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.members)
  projects: Project[];
}
