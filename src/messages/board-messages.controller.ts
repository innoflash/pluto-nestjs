import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BoardMessagesService } from './board-messages.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { FindRequestDto } from '../shared/dto/find-request.dto';

@Controller('board-messages')
@ApiTags('Messages')
export class BoardMessagesController {
  public constructor(private readonly messagesService: BoardMessagesService) {}

  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    return this.messagesService.list(queryParams);
  }

  @Get(':id')
  public find(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.messagesService.find(id, queryParams);
  }
}
