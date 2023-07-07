import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { Role } from '@pluto/users/entities/role';
import { Profile } from '@pluto/users/entities/profile';

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
  @JoinTable({
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'roleId' }
  })
  roles: Role[];

  @OneToOne(() => User, (user) => user.profile)
  profile: Profile;
}
