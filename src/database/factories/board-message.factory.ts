import { setSeederFactory } from 'typeorm-extension';
import { BoardMessage } from '../../messages/entities/board-message.entity';
import { BoardType } from '../../messages/enums/board-type';

export default setSeederFactory(
  BoardMessage,
  faker =>
    new BoardMessage({
      message: faker.lorem.paragraph(),
      type: Object.values(BoardType)[
        faker.number.int({ min: 0, max: Object.entries(BoardType).length - 1 })
      ] as BoardType
    })
);
