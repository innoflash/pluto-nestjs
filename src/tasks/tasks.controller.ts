import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { FindRequestDto } from '../shared/dto/find-request.dto';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ByUserIdQueryFilter } from '../shared/query-filters/by-user-id.query.filter';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TasksController {
  public constructor(private readonly tasksService: TasksService) {}

  @Get('')
  public list(@Query() listRequestDto: ListRequestDto) {
    return this.tasksService
      .setQueryFilters({
        user: ByUserIdQueryFilter
      })
      .list(listRequestDto);
  }

  @Get(':id')
  public findTask(
    @Param('id', ParseIntPipe) id: number,
    @Query() findRequestDto: FindRequestDto
  ) {
    return this.tasksService.findOne(id, findRequestDto);
  }
}
