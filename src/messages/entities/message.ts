import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '@pluto/users/entities/user';

@Entity('messages')
export class Message extends AbstractBaseEntity<Message> {
  @Column()
  subject: string;

  @Column({ type: 'text' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.outgoingMessages, {
    onDelete: 'CASCADE',
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.incomingMessages, {
    onDelete: 'CASCADE',
  })
  recipient: User;
}
