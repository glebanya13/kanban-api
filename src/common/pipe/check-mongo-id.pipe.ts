import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
@Injectable()
export class CheckMongoIdPipe implements PipeTransform<any, string> {
  public transform(value: any) {
    try {
      const transformedObjectId: Types.ObjectId =
        Types.ObjectId.createFromHexString(value);
      return transformedObjectId.toString();
    } catch (error) {
      throw new BadRequestException('Validation failed (ObjectId is expected)');
    }
  }
}
