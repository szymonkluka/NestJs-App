import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const url = context.getArgs()[0].url;
    const method = context.getArgs()[0].method;
    const controllerName = context.getClass().name;
    console.log('==============================');
    console.log(`Method Name: ${method}`);
    console.log(`Exact Address: ${url}`);
    console.log(`Start request in Controller Name: ${controllerName}`);

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(`Request ended in: ${(Date.now() - start) / 1000}s`);
        console.log('==============================');
      }),
    );
  }
}