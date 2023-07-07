import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@pluto/users/entities/user';
import { Role } from '@pluto/users/entities/role';
import { Profile } from '@pluto/users/entities/profile';
import { Rating } from '@pluto/users/entities/rating';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Profile,
      Rating
    ])
  ]
})
export class UsersModule {
}
