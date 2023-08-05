import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Project } from './entities/project.entity';
import { MemberProfileRelationPolicy } from './policies/relation/member-profile.relation.policy';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ByStatusQueryFilter } from './query-filters/by-status.query.filter';
import { ForUserQueryFilter } from './query-filters/for-user.query.filter';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), SharedModule],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ByStatusQueryFilter,
    ForUserQueryFilter,
    MemberProfileRelationPolicy
  ]
})
export class ProjectsModule {}
