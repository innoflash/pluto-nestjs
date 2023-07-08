import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { BoardMessage } from './entities/board-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      BoardMessage
    ])
  ]
})
export class MessagesModule {}
