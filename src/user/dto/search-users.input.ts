import { AutoMap } from '@automapper/classes';
import { MongoStringEqualsInput } from '@common/repository/input/mongo/mongo-equals.input';
import { MongoStringTermsEqualsInput } from '@common/repository/input/mongo/mongo-string-terms.input';

export class SearchUsersFiltersInput {
  @AutoMap(() => MongoStringTermsEqualsInput)
  role?: MongoStringTermsEqualsInput;

  @AutoMap(() => MongoStringEqualsInput)
  username?: MongoStringEqualsInput;

  @AutoMap(() => MongoStringEqualsInput)
  firstName?: MongoStringEqualsInput;

  @AutoMap(() => MongoStringEqualsInput)
  name?: MongoStringEqualsInput;

  @AutoMap(() => MongoStringEqualsInput)
  lastName?: MongoStringEqualsInput;
}
