import { AutoMap } from '@automapper/classes';

export class PaginationInput {
  @AutoMap(() => Number)
  skip?: number;

  @AutoMap(() => Number)
  limit?: number;
}
