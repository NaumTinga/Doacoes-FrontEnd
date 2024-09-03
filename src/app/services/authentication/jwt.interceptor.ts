import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.access) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access}`
        }
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
