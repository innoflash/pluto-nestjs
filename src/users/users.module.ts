import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Profile } from './entities/profile.entity';
import { Rating } from './entities/rating.entity';

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
