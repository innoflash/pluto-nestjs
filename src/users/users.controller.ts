import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { FindRequestDto } from '../shared/dto/find-request.dto';
import { RoleFilter } from './filters/role.filter';
import { ProjectFilter } from './filters/project.filter';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get('')
  public list(@Query() queryParams: ListRequestDto) {
    return this.usersService
      .setFilters({
        role: RoleFilter,
        project: ProjectFilter
      })
      .list(queryParams);
  }

  @Get(':id')
  public findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.usersService.find(id, queryParams);
  }
}
