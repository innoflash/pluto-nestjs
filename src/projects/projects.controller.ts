import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ByStatusQueryFilter } from './query-filters/by-status.query.filter';
import { ForUserQueryFilter } from './query-filters/for-user.query.filter';
import { FindRequestDto } from '../shared/dto/find-request.dto';

@Controller('projects')
@ApiTags('Projects')
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectsController {
  public constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Lists the projects' })
  public list(@Query() listRequestDto: ListRequestDto) {
    const filters = {
      status: ByStatusQueryFilter,
      'for-user': ForUserQueryFilter
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
