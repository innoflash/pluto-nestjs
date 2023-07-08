import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';
import { Role } from './role.entity';
import { Profile } from './profile.entity';
import { Rating } from './rating.entity';
import { Testimony } from '../../testimonies/entities/testimony.entity';
import { Photo } from '../../photos/entities/photo.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Message } from '../../messages/entities/message.entity';
import { BoardMessage } from '../../messages/entities/board-message.entity';
import { Project } from '../../projects/entities/project.entity';

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

  @CreateDateColumn({})
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
