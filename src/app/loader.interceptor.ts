import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from './Services/loader.service';
import { finalize } from 'rxjs/operators';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  
  loaderService.show(); // Show spinner before request

  return next(req).pipe(
    finalize(() => loaderService.hide()) // Hide spinner after response
  );
};
