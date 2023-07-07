import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@pluto/users/entities/user';
import { Role } from '@pluto/users/entities/role';
import { Profile } from '@pluto/users/entities/profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Profile
    ])
  ]
})
export class UsersModule {
}
