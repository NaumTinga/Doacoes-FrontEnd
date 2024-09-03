import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    let authReq = req;

    if (currentUser && currentUser.access) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) { // Unauthorized
          this.handleAuthError();
        }
        return throwError(error);
      })
    );
  }

  private handleAuthError(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // Redirect to login page or any other page
  }
}
