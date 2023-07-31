import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ByStatusQueryFilter } from './query-filters/by-status.query.filter';
import { ForUserQueryFilter } from './query-filters/for-user.query.filter';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService, ByStatusQueryFilter, ForUserQueryFilter]
})
export class ProjectsModule {}
