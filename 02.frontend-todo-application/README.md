# Angular Front end Todo Management Application

#### Installing Node Js (npm) & Visual Studio Code 

- Playlist - https://www.youtube.com/playlist?list=PLBBog2r6uMCQN4X3Aa_jM9qVjgMCHMWx6
- Steps
  - Step 01 - Installing NodeJs and NPM - Node Package Manager
  - Step 02 - Quick Introduction to NPM
  - Step 03 - Installing Visual Studio Code - Front End Java Script Editor

#### Troubleshooting Installations

- Node JS and NPM 
  - https://docs.npmjs.com/common-errors
  - https://docs.npmjs.com/getting-started/troubleshooting
- Visual Studio Code
  - https://code.visualstudio.com/docs/supporting/errors
  - https://code.visualstudio.com/docs/supporting/FAQ
 

## APIs used

### Get Todo - API_URL/{todo_id} (GET /todos/8)

Response
```
{
   "id":"8",
   "username":"in28minutes",
   "description":"Become AWS Certified",
   "targetDate":"2030-07-15T05:46:47.649+0000",
   "done":false
}
```


### Get All Todos - API_URL (GET /todos)

Response
```
[
   {
      "id":"8",
      "username":"in28minutes",
      "description":"Become AWS Certified",
      "targetDate":"2030-07-15T05:46:47.649+0000",
      "done":false
   },
   {
      "id":"9",
      "username":"in28minutes",
      "description":"Learn DevOps with Docker",
      "targetDate":"2030-07-15T05:47:05.906+0000",
      "done":false
   }
]
```


### Update Todo - API_URL/{todo_id} (PUT /todos/9)

Body
```
{
   "id":"9",
   "username":"in28minutes",
   "description":"Learn DevOps with Docker and Kubernetes",
   "targetDate":"2030-07-15T05:47:05.906+0000",
   "done":false
}
```

Response : 200 Success


### Create Todo - API_URL (POST /todos)

Body
```
{
   "id":"-1",
   "username":"in28minutes",
   "description":"Become Azure Certified",
   "done":false,
   "targetDate":"2030-07-15T06:25:00.254Z"
}
```
Response : 200 Success

### Delete Todo - API_URL/{todo_id} (DELETE /todos/9)

Response : 200 Success


# Helpful for Lambdas

```
{
    "resource": "/",
    "path": "/",
    "httpMethod": "POST",
    "body": "{ \"id\": \"-1\",  \"username\": \"in28minutes\",  \"description\": \"Become Azure Certified\",   \"done\": false, \"targetDate\": \"2030-07-15T06:25:00.254Z\"}"
}
```

# Original Angular Documentation


## Todo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
