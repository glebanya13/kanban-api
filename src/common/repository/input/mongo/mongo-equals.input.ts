import { AutoMap } from '@automapper/classes';
import { QuerySelector } from 'mongoose';

export class MongoStringEqualsInput implements QuerySelector<string> {
  @AutoMap(() => String)
  $eq?: string;

  @AutoMap(() => String)
  $ne?: string;
}

export class MongoNumberEqualsInput implements QuerySelector<number> {
  @AutoMap(() => Number)
  $eq?: number;

  @AutoMap(() => Number)
  $ne?: number;
}

export class MongoBooleanEqualsInput implements QuerySelector<boolean> {
  @AutoMap(() => Boolean)
  $eq?: boolean;

  @AutoMap(() => Boolean)
  $ne?: boolean;
}
