import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';
import { User } from '../../users/entities/user.entity';
import { ReadStatus } from '../enums/read-status';

@Entity('messages')
export class Message extends AbstractBaseEntity<Message> {
  @Column()
  subject: string;

  @Column({ type: 'text' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: ReadStatus.NEW })
  status: ReadStatus;

  @ManyToOne(() => User, user => user.outgoingMessages, {
    onDelete: 'CASCADE'
  })
  sender: User;

  @ManyToOne(() => User, user => user.incomingMessages, {
    onDelete: 'CASCADE'
  })
  recipient: User;
}
