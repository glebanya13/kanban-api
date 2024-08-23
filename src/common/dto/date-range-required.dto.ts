import { AutoMap } from '@automapper/classes';

export class DateRangeRequiredDTO {
  @AutoMap(() => Date)
  from: Date;

  @AutoMap(() => Date)
  to: Date;
}
