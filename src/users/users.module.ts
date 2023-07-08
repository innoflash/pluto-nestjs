import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@pluto/users/entities/user.entity';
import { Role } from '@pluto/users/entities/role.entity';
import { Profile } from '@pluto/users/entities/profile.entity';
import { Rating } from '@pluto/users/entities/rating.entity';

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
