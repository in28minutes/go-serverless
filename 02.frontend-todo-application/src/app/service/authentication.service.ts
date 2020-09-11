import { POOL_DATA } from './../app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Observable, throwError } from 'rxjs';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

const userPool = new CognitoUserPool(POOL_DATA);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  executeAWSCognitoAuthenticationService(username, password): Observable<any> {

    //https://docs.aws.amazon.com/cognito/latest/developerguide/authentication.html

    const obs = Observable.create((observer) => {

      const authData = {
        Username: username,
        Password: password
      };

      const authDetails = new AuthenticationDetails(authData);

      const userData = {
        Username: username,
        Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authDetails, {
        onSuccess(result: CognitoUserSession) {
          sessionStorage.setItem(AUTHENTICATED_USER, userPool.getCurrentUser().getUsername());
          sessionStorage.setItem(TOKEN, result.getIdToken().getJwtToken());
          observer.next({ userName: userPool.getCurrentUser().getUsername(), token: result.getIdToken().getJwtToken() });
          console.log(result);
        }, onFailure(err) {
          console.log(err);
          alert(err);
        }
      });

    });

    return obs;

  }

  getCognitoAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout() {
    console.log(sessionStorage.getItem(TOKEN))
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);

    if (userPool && userPool.getCurrentUser())
      userPool.getCurrentUser().signOut();
  }

  isTokenAvailableInURL() {
    const hash = window.location.hash.substr(1)
    if (!hash)
      return false;
    console.log(hash);

    const firstToken = hash.split('&')[0]
    if (!firstToken)
      return false;
    console.log(firstToken);

    const firstValue = firstToken.split('=')[1]
    if (!firstValue)
      return false;

    return true;
  }

  loginWithTokenFromURL() {
    const hash = window.location.hash.substr(1)
    if (!hash)
      return;
    console.log(hash);

    const firstToken = hash.split('&')[0]
    if (!firstToken)
      return;
    console.log(firstToken);

    const firstValue = firstToken.split('=')[1]
    if (!firstValue)
      return;
    console.log(firstValue);

    const claims = this.parseJwt(firstValue)
    console.log(claims)
    console.log(claims.name)
    sessionStorage.setItem(AUTHENTICATED_USER, claims.name);
    sessionStorage.setItem(TOKEN, 'Bearer ' + firstValue);


  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

}

export class AuthenticationBean {
  constructor(public message: string) {
  }
}
