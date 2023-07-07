import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from '@pluto/users/entities/role';

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
}
