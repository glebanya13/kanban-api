import { AutoMap } from '@automapper/classes';
import { QuerySelector } from 'mongoose';

export class MongoStringTermsEqualsInput implements QuerySelector<string[]> {
  @AutoMap(() => [String])
  $in?: string[];
}
