<!---
Current Directory : /in28Minutes/git/go-serverless/00.aws/sam/todo-sam-app
-->

## Complete Code Example


### /template.yaml

```
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31
Description: >
  todo-sam-app

  Sample SAM Template for todo-sam-app

# More info about Globals: https://github.com/awslabs/serverless-application-model/blob/master/docs/globals.rst
Globals:
  Function:
    Timeout: 3
    Runtime: nodejs12.x
    CodeUri: todos/
    Environment:
      Variables:
        # TODO_TABLE: todo
        TODO_TABLE: !Ref TodoSamTable
  HttpApi:
    CorsConfiguration:
      AllowOrigins:
        - "*"
      AllowHeaders:
        - "*"
      AllowMethods:
        - "*"
    Auth:
      Authorizers:
        OAuth2Authorizer:
          JwtConfiguration:
            issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GMdZm52Wh"
            audience:
              - 7h6ivmhtdrfduhu4jjvfjqtduo
          IdentitySource: "$request.header.Authorization"
      DefaultAuthorizer: OAuth2Authorizer

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      # CodeUri: todos/
      Handler: helloworld.lambdaHandler
      # Runtime: nodejs12.x
      Events:
        HelloWorld:
          Type: HttpApi # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /hello
            Method: get

  ListTodosFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      # CodeUri: todos/
      Handler: listTodos.handler
      # Runtime: nodejs12.x
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref TodoSamTable
      Events:
        HelloWorld:
          Type: HttpApi # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /todos
            Method: get

  GetTodoFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: getTodo.handler
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref TodoSamTable
      Events:
        HelloWorld:
          Type: HttpApi
          Properties:
            Path: /todos/{id}
            Method: get

  UpdateTodoFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: updateTodo.handler
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref TodoSamTable
      Events:
        HelloWorld:
          Type: HttpApi
          Properties:
            Path: /todos/{id}
            Method: put

  CreateTodoFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: createTodo.handler
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref TodoSamTable
      Events:
        HelloWorld:
          Type: HttpApi
          Properties:
            Path: /todos
            Method: post

  DeleteTodoFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: deleteTodo.handler
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref TodoSamTable
      Events:
        HelloWorld:
          Type: HttpApi
          Properties:
            Path: /todos/{id}
            Method: delete

  TodoSamTable:
    Type: AWS::Serverless::SimpleTable
    Properties:
      PrimaryKey:
        Name: id
        Type: String

Outputs:
  # ServerlessRestApi is an implicit API created out of Events key under Serverless::Function
  # Find out more about other implicit resources you can reference within SAM
  # https://github.com/awslabs/serverless-application-model/blob/master/docs/internals/generated_resources.rst#api
  HelloWorldApi:
    Description: "API Gateway endpoint URL for Prod stage for Hello World function"
    # Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/"
    Value: !Sub "https://${ServerlessHttpApi}.execute-api.${AWS::Region}.amazonaws.com/hello"
  # HelloWorldFunction:
  #   Description: "Hello World Lambda Function ARN"
  #   Value: !GetAtt HelloWorldFunction.Arn
  # HelloWorldFunctionIamRole:
  #   Description: "Implicit IAM Role created for Hello World function"
  #   Value: !GetAtt HelloWorldFunctionRole.Arn
```
---

### /samconfig.toml

```
version = 0.1
[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "todo-sam-app"
s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-z3pxo89xvmgl"
s3_prefix = "todo-sam-app"
region = "us-east-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
```
---

### /todos/getTodo.js

```js
//GET /todos/{id} => API Gateway => Proxy Integration REST API
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    const id = event.pathParameters.id

    console.log(event)

    //console.log(event.requestContext.authorizer.claims['cognito:username'])

    var params = {
        //TableName: 'todo',
        TableName: process.env.TODO_TABLE,
        Key: { id }
    };

    const results = await dynamo.get(params).promise();

    const statusCode = 200

    const body = JSON.stringify(results.Item)

    const headers = { "Access-Control-Allow-Origin": "*" }

    const response = { statusCode, body, headers };

    return response;
};
```
---

### /todos/listTodos.js

```js
//GET /todos => in28minutes
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    console.log(event)

    const username = 'in28minutes'

    //AVOID HARDCODING
    //HTTP API => const username = event.requestContext.authorizer.jwt.claims['cognito:username']
    //REST API => const username = event.requestContext.authorizer.claims['cognito:username']

    var params = {
        //TableName: 'todo',
        TableName: process.env.TODO_TABLE,
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: { ':username': username }
    };


    const results = await dynamo.scan(params).promise();

    const statusCode = 200

    const body = JSON.stringify(results.Items)

    const headers = { "Access-Control-Allow-Origin": "*" }

    const response = { statusCode, body, headers };

    return response;
};
```
---

### /todos/tests/unit/test-handler.js

```js
'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.equal("hello world");
        // expect(response.location).to.be.an("string");
    });
});
```
---

### /todos/helloworld.js

```js
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world v2',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
```
---

### /todos/createTodo.js

```js
//PUT /todos/{id} => API Gateway => Proxy Integration REST API
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    const item = JSON.parse(event.body)

    if (!item.id || item.id === '-1')
        item.id = Math.random() * Math.pow(10, 16) + ''

    var params = {
        //   TableName : 'todo',
        TableName: process.env.TODO_TABLE,
        Item: item
    };

    const result = await dynamo.put(params).promise();

    const statusCode = 200

    const headers = { "Access-Control-Allow-Origin": "*" }

    const response = { statusCode, body: '', headers };

    return response;
};
```
---

### /todos/updateTodo.js

```js
//PUT /todos/{id} => API Gateway => Proxy Integration REST API
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    const id = event.pathParameters.id

    const body = JSON.parse(event.body)

    var params = {
        //TableName : 'todo',
        TableName: process.env.TODO_TABLE,
        Item: body
    };

    const result = await dynamo.put(params).promise();

    const statusCode = 200

    const headers = { "Access-Control-Allow-Origin": "*" }

    const response = { statusCode, body: '', headers };

    return response;
};
```
---

### /todos/deleteTodo.js

```js
//DELETE /todos/{id} => API Gateway => Proxy Integration REST API
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    const id = event.pathParameters.id

    var params = {
        //   TableName : 'todo',
        TableName: process.env.TODO_TABLE,
        Key: { id }
    };

    const results = await dynamo.delete(params).promise();

    const statusCode = 200

    const headers = { "Access-Control-Allow-Origin": "*" }

    const response = { statusCode, body: '', headers };

    return response;
};
```
---

### /todos/package.json

```json
{
  "name": "hello_world",
  "version": "1.0.0",
  "description": "hello world sample for NodeJS",
  "main": "app.js",
  "repository": "https://github.com/awslabs/aws-sam-cli/tree/develop/samcli/local/init/templates/cookiecutter-aws-sam-hello-nodejs",
  "author": "SAM CLI",
  "license": "MIT",
  "dependencies": {
    "axios": "^0.18.0",
    "aws-sdk": "^2.748.0"
  },
  "scripts": {
    "test": "mocha tests/unit/"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^6.1.4"
  }
}
```
---

### /events/event.json

```json
{
  "body": "{\"message\": \"hello world\"}",
  "resource": "/{proxy+}",
  "path": "/path/to/resource",
  "httpMethod": "POST",
  "isBase64Encoded": false,
  "queryStringParameters": {
    "foo": "bar"
  },
  "pathParameters": {
    "proxy": "/path/to/resource"
  },
  "stageVariables": {
    "baz": "qux"
  },
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "en-US,en;q=0.8",
    "Cache-Control": "max-age=0",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "US",
    "Host": "1234567890.execute-api.us-east-1.amazonaws.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Custom User Agent String",
    "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
    "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  "requestContext": {
    "accountId": "123456789012",
    "resourceId": "123456",
    "stage": "prod",
    "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
    "requestTime": "09/Apr/2015:12:34:56 +0000",
    "requestTimeEpoch": 1428582896000,
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": null,
      "cognitoIdentityId": null,
      "caller": null,
      "accessKey": null,
      "sourceIp": "127.0.0.1",
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": null,
      "userAgent": "Custom User Agent String",
      "user": null
    },
    "path": "/prod/path/to/resource",
    "resourcePath": "/{proxy+}",
    "httpMethod": "POST",
    "apiId": "1234567890",
    "protocol": "HTTP/1.1"
  }
}
```
---
