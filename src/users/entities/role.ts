import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { UserRole } from '@pluto/users/user-role';
import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from '@pluto/users/entities/user';

@Entity('roles')
export class Role extends AbstractBaseEntity<Role> {
  @Column()
  name: UserRole;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
  users: User[];
}