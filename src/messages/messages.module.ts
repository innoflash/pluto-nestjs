import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { BoardMessagesController } from './board-messages.controller';
import { BoardMessagesService } from './board-messages.service';
import { BoardMessage } from './entities/board-message.entity';
import { Message } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { RecipientRelationPolicy } from './policies/recipient.relation.policy';
import { BySenderQueryFilter } from './query-filters/by-sender.query.filter';
import { ForRecipientQueryFilter } from './query-filters/for-recipient.query.filter';
import { MessageStatusQueryFilter } from './query-filters/message-status.query.filter';
import { MessageTypeQueryFilter } from './query-filters/message-type.query.filter';

@Module({
  imports: [TypeOrmModule.forFeature([Message, BoardMessage]), SharedModule],
  providers: [
    MessagesService,
    BoardMessagesService,
    BySenderQueryFilter,
    ForRecipientQueryFilter,
    MessageStatusQueryFilter,
    MessageTypeQueryFilter,
    RecipientRelationPolicy
  ],
  controllers: [MessagesController, BoardMessagesController]
})
export class MessagesModule {}
