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
import { BoardMessagesService } from './board-messages.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { FindRequestDto } from '../shared/dto/find-request.dto';
import { MessageTypeQueryFilter } from './query-filters/message-type.query.filter';

@Controller('board-messages')
@ApiTags('Messages')
@UseInterceptors(ClassSerializerInterceptor)
export class BoardMessagesController {
  public constructor(private readonly messagesService: BoardMessagesService) {}

  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    return this.messagesService
      .setFilters({
        type: MessageTypeQueryFilter
      })
      .list(queryParams);
  }

  @Get(':id')
  public find(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.messagesService.find(id, queryParams);
  }
}
