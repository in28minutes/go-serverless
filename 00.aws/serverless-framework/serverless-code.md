<!---
Current Directory : /in28Minutes/git/go-serverless/00.aws/serverless-framework
-->

## Complete Code Example


### /serverless.yml

```
# Welcome to Serverless!
#
# This file is the main config file for your service.
# It's very minimal at this point and uses default values.
# You can always add more config options for more control.
# We've included some commented out config examples here.
# Just uncomment any of them to get that config option.
#
# For full config options, check the docs:
#    docs.serverless.com
#
# Happy Coding!

service: todo-serverless-framework
# app and org for use with dashboard.serverless.com
#app: your-app-name
#org: your-org-name

# You can pin your service to only deploy with a specific Serverless version
# Check out our docs for more details
frameworkVersion: "1"

provider:
  name: aws
  runtime: nodejs12.x
  httpApi:
    payload: "2.0"
    cors: true
    authorizers:
      TodoJwtAuthorizer:
        identitySource: $request.header.Authorization
        issuerUrl: https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GMdZm52Wh
        audience:
          - 7h6ivmhtdrfduhu4jjvfjqtduo
  environment:
    TODO_TABLE: todo-serverless-framework
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "dynamodb:*"
      # Resource: "*"
      Resource:
        Fn::GetAtt:
          - TodoServerlessFrameworkTable
          - Arn

# you can overwrite defaults here
#  stage: dev
#  region: us-east-1

# you can add statements to the Lambda function's IAM Role here
#  iamRoleStatements:
#    - Effect: "Allow"
#      Action:
#        - "s3:ListBucket"
#      Resource: { "Fn::Join" : ["", ["arn:aws:s3:::", { "Ref" : "ServerlessDeploymentBucket" } ] ]  }
#    - Effect: "Allow"
#      Action:
#        - "s3:PutObject"
#      Resource:
#        Fn::Join:
#          - ""
#          - - "arn:aws:s3:::"
#            - "Ref" : "ServerlessDeploymentBucket"
#            - "/*"

# you can add packaging information here
#package:
#  include:
#    - include-me.js
#    - include-me-dir/**
#  exclude:
#    - exclude-me.js
#    - exclude-me-dir/**

functions:
  hello:
    handler: handler.hello
    events:
      # - http:
      - httpApi:
          path: /hello
          method: get
  listTodos:
    handler: todo/listTodos.handler
    events:
      - httpApi:
          path: /todos
          method: get
          authorizer:
            name: TodoJwtAuthorizer
  getTodo:
    handler: todo/getTodo.handler
    events:
      - httpApi:
          path: /todos/{id}
          method: get
          authorizer:
            name: TodoJwtAuthorizer
  createTodo:
    handler: todo/createTodo.handler
    events:
      - httpApi:
          path: /todos
          method: post
          authorizer:
            name: TodoJwtAuthorizer
  deleteTodo:
    handler: todo/deleteTodo.handler
    events:
      - httpApi:
          path: /todos/{id}
          method: delete
          authorizer:
            name: TodoJwtAuthorizer
  updateTodo:
    handler: todo/updateTodo.handler
    events:
      - httpApi:
          path: /todos/{id}
          method: put
          authorizer:
            name: TodoJwtAuthorizer

# you can add CloudFormation resource templates here
resources:
  Resources:
    TodoServerlessFrameworkTable:
      Type: AWS::DynamoDB::Table
      DeletionPolicy: Retain
      Properties:
        TableName: ${self:provider.environment.TODO_TABLE}
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
#  Outputs:
#     NewOutput:
#       Description: "Description for the output"
#       Value: "Some output value"
```
---

### /handler.js

```js
'use strict';

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
```
---

### /todo/getTodo.js

```js
//GET /todos/{id} => API Gateway => Proxy Integration REST API
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    const id = event.pathParameters.id

    console.log(event)

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

### /todo/listTodos.js

```js
//GET /todos => in28minutes
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    console.log(event)

    const username = 'in28minutes'

    //AVOID HARDCODING
    //JSON.stringify(event.requestContext.authorizer.jwt)
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

### /todo/createTodo.js

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

### /todo/updateTodo.js

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

### /todo/deleteTodo.js

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
