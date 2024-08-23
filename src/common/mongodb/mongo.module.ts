import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const Mongo = MongooseModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    uri: config.get<string>('DATABASE_URL'),
  }),
  imports: [ConfigModule],
  inject: [ConfigService],
});
