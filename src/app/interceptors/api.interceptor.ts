// import { HttpInterceptorFn } from '@angular/common/http';

// export const apiInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = req;

    // Check if it's a PUT or POST request and modify the payload
    if (req.method === 'PUT' || req.method === 'POST') {
      const userId = localStorage.getItem('nameid');

      // Modify request body only if it's an object
      if (userId && req.body && typeof req.body === 'object') {
        const modifiedBody = {
          ...req.body,
          userId: userId, // Ensure user ID is set
          user: { id: userId }, // Send a valid User object with at least the id
          isDeleted: false
        };

        // Clone the request with the modified body
        modifiedReq = req.clone({ body: modifiedBody });
      }
    }

    return next.handle(modifiedReq).pipe(
      map(event => {
        // Log or transform the response if needed
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);

        let errorMessage = 'An unexpected error occurred.';
        if (error.error) {
          errorMessage = error.error.title || error.error.message || JSON.stringify(error.error);
        }

        if (error.status === 400) {
          console.warn('Validation Error:', error.error.errors);
        } else if (error.status === 401) {
          errorMessage = 'Unauthorized. Please log in again.';
        } else if (error.status === 403) {
          errorMessage = 'Forbidden. You do not have permission to access this resource.';
        } else if (error.status === 404) {
          errorMessage = 'Resource not found.';
        } else if (error.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
