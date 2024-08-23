import { AutoMap } from '@automapper/classes';

export class NumberRangeRequiredDTO {
  @AutoMap(() => Number)
  from: number;

  @AutoMap(() => Number)
  to: number;
}
