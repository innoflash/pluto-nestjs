import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ByStatusFilter } from './filters/by-status.filter';
import { ForUserFilter } from './filters/for-user.filter';
import { FindRequestDto } from '../shared/dto/find-request.dto';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  public constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Lists the projects' })
  public list(@Query() listRequestDto: ListRequestDto) {
    const filters = {
      status: ByStatusFilter,
      'for-user': ForUserFilter
    };

    return this.projectsService.setFilters(filters).list(listRequestDto);
  }

  @Get(':id')
  public findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.projectsService.find(id, queryParams);
  }
}
