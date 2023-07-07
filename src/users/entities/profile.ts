import { Column, Entity, OneToOne } from 'typeorm';
import { User } from '@pluto/users/entities/user';
import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';

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
  user: User;
}
