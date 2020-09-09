<!---
Current Directory : /Ranga/git/01.udemy-course-repos/serverless-with-aws-lambda-and-azure-functions/frontend/02-todo-with-aws-cognito
-->

## Complete Code Example


### /karma.conf.js

```js
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/todo'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
```
---

### /src/app/app-routing.module.ts

```
import { TodoComponent } from './todo/todo.component';
import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';

// welcome
const routes: Routes = [
  { path: '', component: LoginComponent  }, // canActivate, RouteGuardService
  { path: 'login', component: LoginComponent },
  { path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService]},
  { path: 'todos', component: ListTodosComponent, canActivate: [RouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: 'todos/:id', component: TodoComponent, canActivate: [RouteGuardService] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
---

### /src/app/app.component.css

```css
```
---

### /src/app/app.component.html

```html
<!--<app-welcome></app-welcome>-->

<!-- <app-login></app-login> -->
<!--
<div>Component Content</div>-->

<app-menu></app-menu>

<div class="container">
    <router-outlet></router-outlet>
</div>

<app-footer></app-footer>
```
---

### /src/app/app.component.ts

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: '<h1>{{title}}<h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  message = 'Welcome to in28Minutes';
}
```
---

### /src/app/app.constants.ts

```
export const API_URL = 'https://ys57vs4hy7.execute-api.us-east-1.amazonaws.com/dev/task-todo';
export const TODO_JPA_API_URL = 'https://ys57vs4hy7.execute-api.us-east-1.amazonaws.com/dev/task-todo';
```
---

### /src/app/app.module.ts

```
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
---

### /src/app/error/error.component.css

```css
```
---

### /src/app/error/error.component.html

```html
{{errorMessage}}
```
---

### /src/app/error/error.component.ts

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage = 'An Error Occured! Contact Support at *** - ***'

  constructor() { }

  ngOnInit() {
  }

}
```
---

### /src/app/footer/footer.component.css

```css
.footer {
    position: absolute;
    bottom: 0;
    width:100%;
    height: 40px;
    background-color: #222222;
}
```
---

### /src/app/footer/footer.component.html

```html
<footer class="footer">
    <div class="container">
        <span class="text-muted">All Rights Reserved 2018 @in28minutes</span>
    </div>

</footer>
```
---

### /src/app/footer/footer.component.ts

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
---

### /src/app/list-todos/list-todos.component.css

```css
```
---

### /src/app/list-todos/list-todos.component.html

```html
<h1> Todo </h1>

<div class="alert alert-success" *ngIf='message'>{{message}}</div>

<div class="container">
  <table class="table">
    <thead>
      <tr>
        <th>Description</th>
        <th>Target Date</th>
        <th>is Completed?</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <!--   for (Todo todo: todos) {  -->
              <tr *ngFor="let todo of todos">
                <td>{{todo.description}}</td>
                <td>{{todo.targetDate | date | uppercase}}</td>
                <td>{{todo.done}}</td>
                <td><button (click)="updateTodo(todo.id)" class="btn btn-success">Update</button></td>
                <td><button (click)="deleteTodo(todo.id)" class="btn btn-warning">Delete</button></td>
              </tr>
      <!-- } -->
    </tbody>

  </table>

  <div class="row">
      <button (click)="addTodo()" class="btn btn-success">Add</button>
  </div>

</div>
```
---

### /src/app/list-todos/list-todos.component.ts

```
import {TodoDataService} from './../service/data/todo-data.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BasicAuthenticationService} from '../service/basic-authentication.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];

  message: string;

  constructor(private todoService: TodoDataService, private router: Router,
              private basicAuthenticationService: BasicAuthenticationService) {
  }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos(this.basicAuthenticationService.getAuthenticatedUser()).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  deleteTodo(id) {
    console.log(`delete todo ${id}`);
    this.todoService.deleteTodo(this.basicAuthenticationService.getAuthenticatedUser(), id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`;
        this.refreshTodos();
      }
    );
  }

  updateTodo(id) {
    console.log(`update ${id}`);
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }
}
```
---

### /src/app/login/login.component.css

```css
```
---

### /src/app/login/login.component.html

```html
<H1>Login!</H1>

<div class="container">
  <div class="alert alert-warning" *ngIf='invalidLogin'>{{errorMessage}}</div>

  <div>
    User Name : <input type="text" name="username" [(ngModel)]="username">
    Password  : <input type="password" name="password" [(ngModel)]="password">

    <!-- User Name : {{username}} -->

    <!-- <button (click)=handleLogin() class="btn btn-success">Login</button> -->
    <!-- <button (click)=handleBasicAuthLogin() class="btn btn-success">Login</button> -->
    <button (click)=handleAWSCognitoLogin() class="btn btn-success">Login</button>

  </div>
</div>
```
---

### /src/app/login/login.component.ts

```
import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'serverless';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  // Router
  // Angular.giveMeRouter
  // Dependency Injection
  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit() {
  }

  handleLogin() {
    // console.log(this.username);
    // if(this.username==="in28minutes" && this.password === 'dummy') {
    if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      // Redirect to Welcome Page
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

  handleBasicAuthLogin() {
    // console.log(this.username);
    // if(this.username==="in28minutes" && this.password === 'dummy') {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['welcome', this.username]);
            this.invalidLogin = false;
          },
          error => {
            console.log(error);
            this.invalidLogin = true;
          }
        );
  }

  handleJWTAuthLogin() {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['welcome', this.username]);
            this.invalidLogin = false;
          },
          error => {
            console.log(error);
            this.invalidLogin = true;
          }
        );
  }

  handleAWSCognitoLogin() {
    this.basicAuthenticationService.executeAWSCognitoAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log('in success method : ' + data);
          console.log('username : ' + this.username);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error => {
          console.log("in Error method" + error);
          this.invalidLogin = true;
        }
      );
  }

}
```
---

### /src/app/logout/logout.component.css

```css
```
---

### /src/app/logout/logout.component.html

```html
<H1>You are logged out</H1>
<div class="container">
  Thank You For Using Our Application.
</div>
```
---

### /src/app/logout/logout.component.ts

```
import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import {BasicAuthenticationService} from '../service/basic-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit() {
    this.basicAuthenticationService.logout();
  }

}
```
---

### /src/app/menu/menu.component.css

```css
```
---

### /src/app/menu/menu.component.html

```html
<header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div><a href="https://www.in28minutes.com" class="navbar-brand">
            in28minutes</a></div>

        <ul class="navbar-nav">
            <li><a *ngIf="isUserLoggedIn" routerLink="/welcome/in28minutes" class="nav-link">Home</a></li>
            <li><a *ngIf="isUserLoggedIn" routerLink="/todos" class="nav-link">Todos</a></li>
        </ul>

        <ul class="navbar-nav navbar-collapse justify-content-end">
                <li><a *ngIf="!isUserLoggedIn" routerLink="/login" class="nav-link">Login</a></li>
                <li><a *ngIf="isUserLoggedIn" routerLink="/logout" class="nav-link">Logout</a></li>
        </ul>
    </nav>
</header>
```
---

### /src/app/menu/menu.component.ts

```
import {HardcodedAuthenticationService} from './../service/hardcoded-authentication.service';
import {Component, OnInit} from '@angular/core';
import {BasicAuthenticationService} from '../service/basic-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private basicAuthenticationService: BasicAuthenticationService) {
  }

  ngOnInit() {
    this.isUserLoggedIn = this.basicAuthenticationService.isUserLoggedIn();
  }

}
```
---

### /src/app/service/basic-authentication.service.ts

```
import {API_URL} from './../app.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';


const POOL_DATA = {
  UserPoolId: 'us-east-1_7dF78dyvw',
  ClientId: '7pn13e127fqnptfp0glb3bke8e'
};

const userPool = new CognitoUserPool(POOL_DATA);

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) {
  }

  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(
      `${API_URL}/authenticate`, {
        username,
        password
      }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
    // console.log("Execute Hello World Bean Service")
  }

  executeAWSCognitoAuthenticationService(username, password): Observable<any> {
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
          console.log('On Success Method');
          sessionStorage.setItem(AUTHENTICATED_USER, userPool.getCurrentUser().getUsername());
          sessionStorage.setItem(TOKEN, result.getIdToken().getJwtToken());
          observer.next({userName: userPool.getCurrentUser().getUsername(), token: result.getIdToken().getJwtToken()});
          console.log(result);
        }, onFailure(err) {
          alert(err);
        }
      });
    });
    return obs;
  }

  executeAuthenticationService(username, password) {

    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    const headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });

    return this.http.get<AuthenticationBean>(
      `${API_URL}/basicauth`,
      {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
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
    console.log(!(user === null));
    return !(user === null);
  }

  logout() {
    userPool.getCurrentUser().signOut();
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}

export class AuthenticationBean {
  constructor(public message: string) {
  }
}
```
---

### /src/app/service/data/todo-data.service.ts

```
import {TODO_JPA_API_URL} from './../../app.constants';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Todo} from '../../list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) {
  }

  retrieveAllTodos(username) {
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}`);
    // console.log("Execute Hello World Bean Service")
  }

  deleteTodo(username, id) {
    console.log('UserName : ' + username);
    console.log('Id : ' + id);
    return this.http.delete(`${TODO_JPA_API_URL}/${id}`);
  }

  retrieveTodo(username, id) {
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/${id}`);
  }

  updateTodo(username, id, todo) {
    console.log(todo);
    return this.http.post(`${TODO_JPA_API_URL}`, todo);
  }

  createTodo(username, todo) {
    console.log(todo);
    return this.http.post(`${TODO_JPA_API_URL}`, todo);
  }

}
```
---

### /src/app/service/data/welcome-data.service.ts

```
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    console.log('executeHelloWorldBeanService');
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
    // console.log("Execute Hello World Bean Service")
  }

  executeHelloWorldServiceWithPathVariable(name) {
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // let headers = new HttpHeaders({
    //     Authorization: basicAuthHeaderString
    //   })

    return this.http.get<HelloWorldBean>(
      `https://emt0pd6q7a.execute-api.eu-west-2.amazonaws.com/dev/task-todo`,
      );
  }

  // createBasicAuthenticationHttpHeader() {
  //   let username = 'in28minutes'
  //   let password = 'dummy'
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }
  // Access to XMLHttpRequest at
  // 'http://localhost:8080/hello-world/path-variable/in28minutes'
  // from origin 'http://localhost:4200' has been blocked by CORS policy:
  // No 'Access-Control-Allow-Origin' header is present on the requested resource.

  // Access to XMLHttpRequest at 'http://localhost:8080/hello-world/path-variable/in28minutes' from origin 'http://localhost:4200'
  // has been blocked by CORS policy:
  // Response to preflight request doesn't pass
  // access control check: It does not have HTTP ok status
}
```
---

### /src/app/service/hardcoded-authentication.service.ts

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username, password) {
    if (username === 'in28minutes' && password === 'dummy') {
      sessionStorage.setItem('authenticaterUser', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticaterUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
  }

}
```
---

### /src/app/service/http/http-intercepter-basic-auth.service.ts

```
import { BasicAuthenticationService } from './../basic-authentication.service';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    const username = this.basicAuthenticationService.getAuthenticatedUser();
   // console.log('basicAuthHeaderString : ' + basicAuthHeaderString);
    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders : {
            Authorization : basicAuthHeaderString
          }
        });
    }
    return next.handle(request);
  }


}
```
---

### /src/app/service/route-guard.service.ts

```
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.hardcodedAuthenticationService.isUserLoggedIn())
      return true;

    this.router.navigate(['login']);

    return false;
  }
}
```
---

### /src/app/todo/todo.component.css

```css
.ng-invalid:not(form) {
    border-left: 5px solid red;
}
```
---

### /src/app/todo/todo.component.html

```html
<H1>Todo</H1>

<div class="container">
  <div class="alert alert-warning" *ngIf="todoForm.dirty && todoForm.invalid">Enter valid values</div>
  <div class="alert alert-warning" *ngIf="todoForm.dirty && targetDate.invalid">Enter valid Target Date</div>
  <div class="alert alert-warning" *ngIf="todoForm.dirty && description.invalid">Enter atleast 5 characters in Description</div>
  
  <form (ngSubmit)="!todoForm.invalid && saveTodo()" #todoForm="ngForm">
    <fieldset class="form-group">
      <label>Description</label>
      <input type="text" #description="ngModel" 
            [(ngModel)]="todo.description" class="form-control" 
                name="description" required="required" minlength="5">
    </fieldset>

    <fieldset class="form-group">
        <label>Target Date</label>
        <input type="date" #targetDate="ngModel"
        [ngModel]="todo.targetDate | date:'yyyy-MM-dd' "
        (ngModelChange)="todo.targetDate = $event"
        class="form-control" name="targetDate" required="required" >
    </fieldset>

    <button type="submit" class="btn btn-success">Save</button>
  </form>  
</div>
```
---

### /src/app/todo/todo.component.ts

```
import {ActivatedRoute, Router} from '@angular/router';
import {TodoDataService} from './../service/data/todo-data.service';
import {Component, OnInit} from '@angular/core';
import {Todo} from '../list-todos/list-todos.component';
import {BasicAuthenticationService} from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService
  ) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    if (this.id != -1) {
      this.todoService.retrieveTodo(this.basicAuthenticationService.getAuthenticatedUser(), this.id)
        .subscribe(
          data => {
            console.log(data);
            this.todo = data[0];
          }
        );
    }
  }

  saveTodo() {
    if (this.id == -1) { // === ==
      this.todoService.createTodo(this.basicAuthenticationService.getAuthenticatedUser(), this.todo)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['todos']);
          }
        );
    } else {
      this.todoService.updateTodo(this.basicAuthenticationService.getAuthenticatedUser(), this.id, this.todo)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['todos']);
          }
        );
    }
  }

}
```
---

### /src/app/welcome/welcome.component.css

```css
```
---

### /src/app/welcome/welcome.component.html

```html
<H1>Welcome!</H1>

<div class="container">
  Welcome {{name}}. You can manage your todos <a routerLink="/todos">here</a>
</div>

<div class="container">
  Click here to get a customized welcome message 
  <button (click)="getWelcomeMessageWithParameter()" class="btn btn-success">Get Welcome Message</button>
</div>

<div class="container" *ngIf="welcomeMessageFromService">
    <H2>Your Customized Welcome Message</H2>
    {{welcomeMessageFromService}}
  </div>
```
---

### /src/app/welcome/welcome.component.ts

```
import { WelcomeDataService } from './../service/data/welcome-data.service';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core'; // './app.component';
// import { AppComponent } from '../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  message = 'Some Welcome Message';
  welcomeMessageFromService: string;
  name = '';
  // ActivatedRoute
  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService) {

  }

  ngOnInit() {
    // COMPILATION ERROR this.message = 5
    console.log(this.message)
    console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name'];

  }

  getWelcomeMessage() {
    // console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    // console.log('last line of getWelcomeMessage')
    // console.log("get welcome message");
  }

  getWelcomeMessageWithParameter() {
    console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
     // console.log('last line of getWelcomeMessage');
     // console.log('get welcome message');
  }


  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message;
    // console.log(response);
  }

  handleErrorResponse(error) {
    // console.log(error);
    this.welcomeMessageFromService = error.error.message;
  }
}
```
---

### /src/environments/environment.prod.ts

```
export const environment = {
  production: true
};
```
---

### /src/environments/environment.ts

```
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
```
---

### /src/index.html

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>My Todos Application</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script>
    if (global === undefined) {
      var global = window;
    }
  </script>
</head>

<body>
  <app-root></app-root>
  <!-- <div>Index HTML Content</div> -->
</body>

</html>
```
---

### /src/main.ts

```
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```
---

### /src/polyfills.ts

```
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.

/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */
```
---

### /src/styles.css

```css
/* You can add global styles to this file, and also import other style files */
@import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css)
```
---

### /src/test.ts

```
// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
```
---

### /angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "todo": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/todo",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "aot": true,
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "6kb",
                  "maximumError": "10kb"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "todo:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "todo:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "todo:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json",
              "e2e/tsconfig.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        },
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "todo:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "todo:serve:production"
            }
          }
        }
      }
    }},
  "defaultProject": "todo"
}
```
---

### /package.json

```json
{
  "name": "todo",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~10.0.3",
    "@angular/common": "~10.0.3",
    "@angular/compiler": "~10.0.3",
    "@angular/core": "~10.0.3",
    "@angular/forms": "~10.0.3",
    "@angular/platform-browser": "~10.0.3",
    "@angular/platform-browser-dynamic": "~10.0.3",
    "@angular/router": "~10.0.3",
    "amazon-cognito-identity-js": "^1.31.0",
    "rxjs": "~6.5.5",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.3"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.1000.2",
    "@angular/cli": "~10.0.2",
    "@angular/compiler-cli": "~10.0.3",
    "@types/node": "^12.11.1",
    "@types/jasmine": "~3.5.0",
    "@types/jasminewd2": "~2.0.3",
    "codelyzer": "^6.0.0",
    "jasmine-core": "~3.5.0",
    "jasmine-spec-reporter": "~5.0.0",
    "karma": "~5.0.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage-istanbul-reporter": "~3.0.2",
    "karma-jasmine": "~3.3.0",
    "karma-jasmine-html-reporter": "^1.5.0",
    "protractor": "~7.0.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~3.9.5"
  }
}
```
---
