import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LoggerService } from '../services/logger-service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);

  return next(req).pipe(
    catchError(err => {
      const errorMessage = err?.message || 'Unknown error';
      logger.log(errorMessage);
      alert('An error occurred: ' + errorMessage);
      return throwError(() => err);
    })
  );
};
