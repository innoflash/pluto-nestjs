import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageStatusFilter } from './filters/message-status.filter';
import { AbstractFilter } from '../shared/abstract-filter';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageListingDto } from './responses/message-listing.dto';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { FindRequestDto } from '../shared/dto/find-request.dto';

@Controller('messages')
export class MessagesController {
  public constructor(private readonly messagesService: MessagesService) {}

  @ApiOkResponse({ type: MessageListingDto })
  @ApiOperation({
    summary: 'This lists the messages for the given options'
  })
  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    const filters: Record<string, typeof AbstractFilter> = {
      'message-status': MessageStatusFilter
    };

    return this.messagesService.setFilters(filters).list(queryParams);
  }

  @ApiOperation({
    summary: 'Fetches a single message'
  })
  @Get(':id')
  public find(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.messagesService.find(id, queryParams);
  }
}
