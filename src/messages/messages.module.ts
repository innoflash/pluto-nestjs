import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { BoardMessage } from './entities/board-message.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      BoardMessage
    ])
  ],
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {}
