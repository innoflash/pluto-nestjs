import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '@pluto/messages/entities/message.entity';
import { BoardMessage } from '@pluto/messages/entities/board-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      BoardMessage
    ])
  ]
})
export class MessagesModule {}
