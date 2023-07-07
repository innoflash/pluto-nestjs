import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '@pluto/messages/entities/message';
import { BoardMessage } from '@pluto/messages/entities/board-message';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      BoardMessage
    ])
  ]
})
export class MessagesModule {}
