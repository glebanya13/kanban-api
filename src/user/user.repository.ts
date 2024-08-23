import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { UserDocument } from './user.schema';
import { MongoRepository } from '@common/mongodb/mongo.repository';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends MongoRepository<User> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }
}
