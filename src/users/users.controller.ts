import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get('')
  public list(@Query() queryParams: ListRequestDto) {
    return this.usersService.list(queryParams);
  }
}
