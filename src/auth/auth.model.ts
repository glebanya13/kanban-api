import { DatabaseModel } from '@common/type/model';

export class Auth extends DatabaseModel {
  username: string;
  password: string;
  userId: string;
}
