import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@pluto/projects/entities/project';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project])
  ]
})
export class ProjectsModule {
}
