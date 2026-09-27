import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        statusCode: response.statusCode,
        message: 'Thành công',
        timestamp: new Date().toISOString(),
        path: request.url,
        data,
      })),
    );
  }
}