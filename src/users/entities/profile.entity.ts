import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';
import { User } from './user.entity';

@Entity('profiles')
export class Profile extends AbstractBaseEntity<Profile>{
  @Column({ length: 15 })
  phone: string;

  @Column({ nullable: true })
  profession?: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ nullable: true })
  profilePhoto?: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
