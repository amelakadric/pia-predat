import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class UserIdInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the userId from the UserService
    const user = localStorage.getItem('user');
    if (!user) {
      return next.handle(request);
    }
    const userId = JSON.parse(user)._id;

    // Clone the request and add the userId header
    const modifiedRequest = request.clone({
      setHeaders: {
        userId: userId,
      },
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}
