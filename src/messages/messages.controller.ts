58;
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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { FindRequestDto } from '../shared/dto/find-request.dto';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { EntityPolicy } from '../shared/policies/entity.policy';
import { TeachersAllowedRelationsPolicy } from '../shared/policies/relations/teachers-allowed-relations.policy';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';
import { SenderFilterPolicy } from './policies/filters/sender.filter.policy';
import { BySenderQueryFilter } from './query-filters/by-sender.query.filter';
import { ForRecipientQueryFilter } from './query-filters/for-recipient.query.filter';
import { MessageStatusQueryFilter } from './query-filters/message-status.query.filter';
import { MessageListingDto } from './responses/message-listing.dto';

@Controller('messages')
@ApiTags('Messages')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class MessagesController {
  public constructor(
    private readonly messagesService: MessagesService,
    private readonly entityPolicy: EntityPolicy<Message>
  ) {}

  @ApiOkResponse({ type: MessageListingDto })
  @ApiOperation({
    summary: 'This lists the messages for the given options'
  })
  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    const filters = {
      status: MessageStatusQueryFilter,
      sender: BySenderQueryFilter,
      recipient: ForRecipientQueryFilter
    };

    return this.messagesService
      .setQueryFilters(filters)
      .setQueryFiltersPolicies({
        sender: SenderFilterPolicy
      })
      .setRelationsPolicies({
        'recipient.profile': TeachersAllowedRelationsPolicy
      })
      .list(queryParams);
  }

  @ApiOperation({
    summary: 'Fetches a single message'
  })
  @Get(':id')
  public find(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.messagesService.findOne(id, queryParams).then(message => {
      this.entityPolicy.authorize(message);
    });
  }
}
