import { AutoMap } from '@automapper/classes';
import { QuerySelector } from 'mongoose';

export class MongoDateRangeInput implements QuerySelector<Date> {
  @AutoMap(() => Date)
  $gte?: Date;

  @AutoMap(() => Date)
  $lte?: Date;
}
