import { AuthenticationService } from './../authentication.service';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const basicAuthHeaderString = this.authenticationService.getAuthenticatedToken();
    const username = this.authenticationService.getAuthenticatedUser();
    console.log('Token used : ' + basicAuthHeaderString);
    console.log('~~~~~~~~~~~~~~~~~~');
    console.log('IF REQUEST FAILED');
    console.log('~~~~~~~~~~~~~~~~~~');
    console.log('1. HAS TOKEN EXPIRED? RELOGIN AND REFRESH TOKEN');
    console.log('2. IS THE API URL RIGHT? GRAB THE REQUEST DETAILS FROM NETWORK TAB AND RUN IT IN REST API CLIENT');
    console.log('3. IS THE FORMAT OF THE TOKEN RIGHT?');
    console.log('4. IS THE BACKEND/API GATEWAY CONFIGURATION RIGHT?');
    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(request);
  }


}
