import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AddOriginMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    if (request.method === 'GET') {
      const origin = request.headers.origin ?? '*';
      console.log('SET ORIGIN', origin);
      response.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      console.log('NOT SET ORIGIN');
    }

    next();
  }
}
