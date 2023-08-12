import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as process from 'process';
import { FindRequestDto } from '../shared/dto/find-request.dto';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ProjectQueryFilter } from './query-filters/project.query.filter';
import { RoleQueryFilter } from './query-filters/role.query.filter';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
//@UseGuards(JwtAuthGuard)
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get('')
  public list(@Query() queryParams: ListRequestDto) {
    return this.usersService
      .setQueryFilters({
        role: RoleQueryFilter,
        project: ProjectQueryFilter
      })
      .list(queryParams);
  }

  @Get(':id')
  public findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.usersService.findOne(id, queryParams);
  }

  @Get('error')
  public errorEndpoint() {
    process.exit(1);
  }
}
