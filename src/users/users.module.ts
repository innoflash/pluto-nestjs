import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@pluto/users/entities/user';
import { Role } from '@pluto/users/entities/role';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role
    ])
  ]
})
export class UsersModule {
}
