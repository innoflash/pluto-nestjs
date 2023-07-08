import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';
import { UserRole } from '../user-role';
import { User } from './user.entity';

@Entity('roles')
export class Role extends AbstractBaseEntity<Role> {
  @Column()
  name: UserRole;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
  @JoinTable({
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'userId' }
  })
  users: User[];
}
