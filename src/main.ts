import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT');
  const USE_CORS = configService.get<string>('USE_CORS');
  const PROJECT_VERSION = configService.get<string>('PROJECT_VERSION');

  if (USE_CORS === 'true') {
    let whitelist = configService.get('WHITE_LIST');
    whitelist = whitelist ? process.env.WHITE_LIST.split(',') : [];
    app.enableCors({
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      origin: whitelist,
    });
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Practice API')
    .setDescription('The practice API description')
    .setVersion(PROJECT_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
