import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Role } from '@pluto/users/entities/role.entity';
import { Profile } from '@pluto/users/entities/profile.entity';
import { Testimony } from '@pluto/testimonies/entities/testimony.entity';
import { Project } from '@pluto/projects/entities/project.entity';
import { Rating } from '@pluto/users/entities/rating.entity';
import { Photo } from '@pluto/photos/entities/photo.entity';
import { Task } from '@pluto/tasks/entities/task.entity';
import { Message } from '@pluto/messages/entities/message.entity';
import { BoardMessage } from '@pluto/messages/entities/board-message.entity';

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

  @OneToMany(() => Message, (message) => message.sender)
  outgoingMessages: Message[];

  @OneToMany(() => Message, (message) => message.recipient)
  incomingMessages: Message[];

  @OneToMany(() => BoardMessage, (message) => message.user)
  boardMessages: Message[];

  @ManyToMany(() => Project, (project) => project.members)
  projects: Project[];
}
