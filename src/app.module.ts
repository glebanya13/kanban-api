import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Mongo } from '@common/mongodb/mongo.module';
import { configModule } from '@common/config/config.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AddOriginMiddleware } from '@common/middleware/add-origin.middleware';
import { LoggerMiddleware } from '@common/middleware/log.middleware';

@Module({
  imports: [AuthModule, UserModule, Mongo, configModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AddOriginMiddleware).forRoutes('*');
  }
}
