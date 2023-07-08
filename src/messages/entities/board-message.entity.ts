import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../../database/abstract-base.entity';
import { BoardType } from '../board-type';
import { User } from '../../users/entities/user.entity';

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