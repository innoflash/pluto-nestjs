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
import { BoardMessagesService } from './board-messages.service';
import { MessageTypeQueryFilter } from './query-filters/message-type.query.filter';

@Controller('board-messages')
@ApiTags('Messages')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class BoardMessagesController {
  public constructor(private readonly messagesService: BoardMessagesService) {}

  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    return this.messagesService
      .setQueryFilters({
        type: MessageTypeQueryFilter
      })
      .list(queryParams);
  }

  @Get(':id')
  public find(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.messagesService.findOne(id, queryParams);
  }
}
