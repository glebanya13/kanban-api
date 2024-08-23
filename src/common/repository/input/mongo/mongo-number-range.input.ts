import { AutoMap } from '@automapper/classes';
import { QuerySelector } from 'mongoose';

export class MongoNumberRangeInput implements QuerySelector<number> {
  @AutoMap(() => Number)
  $gte?: number;

  @AutoMap(() => Number)
  $lte?: number;
}
