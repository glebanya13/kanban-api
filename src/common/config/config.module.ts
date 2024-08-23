import { ConfigModule } from '@nestjs/config';
import { version } from '../../../package.json';

export const configModule = ConfigModule.forRoot({
  envFilePath: `${process.cwd()}/.env`,
  load: [
    () => {
      return {
        PORT: Number(process.env.PORT),
        USE_CORS: process.env.USE_CORS,
        WHITE_LIST: process.env.WHITE_LIST,
        PROJECT_VERSION: version,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
      };
    },
  ],
});
