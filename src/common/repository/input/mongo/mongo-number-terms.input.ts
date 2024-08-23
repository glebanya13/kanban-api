import { AutoMap } from '@automapper/classes';
import { QuerySelector } from 'mongoose';

export class MongoNumberTermsEqualsInput implements QuerySelector<number[]> {
  @AutoMap(() => [Number])
  $in?: number[];
}
