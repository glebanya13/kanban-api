import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.model';
import { AuthDocument } from './auth.schema';
import { MongoRepository } from '@common/mongodb/mongo.repository';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository extends MongoRepository<Auth> {
  constructor(@InjectModel(Auth.name) model: Model<AuthDocument>) {
    super(model, ['userId']);
  }
}
