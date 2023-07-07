import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '@pluto/database/abstract-base.entity';
import { BoardType } from '@pluto/messages/board-type';
import { User } from '@pluto/users/entities/user';

@Entity('board_messages')
export class BoardMessage extends AbstractBaseEntity<BoardMessage> {
  @Column()
  message: string;

  @Column()
  type: BoardType;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.boardMessages, { onDelete: 'CASCADE' })
  user: User;
}