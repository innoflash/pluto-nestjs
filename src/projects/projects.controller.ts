import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  public constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Lists the projects' })
  public list(@Query() listRequestDto: ListRequestDto) {
    return this.projectsService.list(listRequestDto);
  }
}
