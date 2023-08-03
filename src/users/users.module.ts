import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Rating } from './entities/rating.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { ProjectQueryFilter } from './query-filters/project.query.filter';
import { RoleQueryFilter } from './query-filters/role.query.filter';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Profile, Rating])],
  controllers: [UsersController],
  providers: [UsersService, RoleQueryFilter, ProjectQueryFilter],
  exports: [UsersService]
})
export class UsersModule {}
