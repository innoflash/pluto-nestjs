import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ByStatusFilter } from './filters/by-status.filter';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  public constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Lists the projects' })
  public list(@Query() listRequestDto: ListRequestDto) {
    const filters = {
      status: ByStatusFilter
    };

    return this.projectsService.setFilters(filters).list(listRequestDto);
  }
}
