import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '@pluto/messages/entities/message';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message
    ])
  ]
})
export class MessagesModule {}
