import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { BoardMessage } from './entities/board-message.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { BoardMessagesService } from './board-messages.service';
import { BoardMessagesController } from './board-messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message, BoardMessage])],
  providers: [MessagesService, BoardMessagesService],
  controllers: [MessagesController, BoardMessagesController]
})
export class MessagesModule {}
