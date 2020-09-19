## Lambda and API Gateway Configuration

### Lambda Functions

#### helloWorld

```
exports.handler = async (event, context) => {
    
    //console.log(event);
    //console.log(context);
    console.log(context.functionName);
    console.log(context.memoryLimitInMB);
    console.log(context.logGroupName);
    console.log(context.getRemainingTimeInMillis());//2985
    
    //console.log(event.key1);
    
    let statusCode = 200;
    
    let todo = {
      "id": 100,
      "description": "Become AWS Certified v8",
      "isDone": false
    };
    
    let headers = {
        "Content-Type" : "application/json"
    }
    
    //let body = JSON.stringify('Hello from Lambda!');
    let body = JSON.stringify(todo);
    
    const response = {
        statusCode,
        body,
        headers
    };
    
    return response;
};

```

#### helloWorldRest

```
exports.handler = async (event) => {
    
    console.log(event)
    //console.log(event.params.header.header1)
    //console.log(event.headers.header2)
    
    
    const response = {
        statusCode: 200,
        //body: "Dummy Response"
        body: JSON.stringify(event),
        //body: JSON.stringify('Hello World REST 1 '),
        //body: JSON.stringify('Hello World REST 1 ' + event.params.header.header1),
    };
    
    return response;
};

```

#### helloWorldHttp

```
exports.handler = async (event) => {
    
    console.log(event)
    
    //const response = {
    //    statusCode: 200,
    //    body: JSON.stringify(event),
    //};
    
    return event;

    
};

```

#### AutomaticallyActiveCognitoSignupUser

```
exports.handler = (event, context, callback) => {
    //console.log(event)
    event.response.autoConfirmUser = true;
    
    // Return to Amazon Cognito
    callback(null, event);
};
```

#### createTodo

```
//PUT /todos/{id} => API Gateway => Proxy Integration REST API
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const item = JSON.parse(event.body)
    
    if(!item.id || item.id === '-1') 
        item.id = Math.random() * Math.pow(10,16) + ''

    var params = {
      TableName : 'todo',
      Item: item
    };
    
    const result = await dynamo.put(params).promise();
    
    const statusCode = 200
    
    const headers = { "Access-Control-Allow-Origin":"*" }
    
    const response = { statusCode, body:'', headers };

    return response;
};

```

#### updateTodo

```
//PUT /todos/{id} => API Gateway => Proxy Integration REST API
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const id = event.pathParameters.id
    
    const body = JSON.parse(event.body)

    var params = {
      TableName : 'todo',
      Item: body
    };
    
    const result = await dynamo.put(params).promise();
    
    const statusCode = 200
    
    const headers = { "Access-Control-Allow-Origin":"*" }
    
    const response = { statusCode, body:'', headers };

    return response;
};

```

#### deleteTodo

```
//DELETE /todos/{id} => API Gateway => Proxy Integration REST API
//Lamdba function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const id = event.pathParameters.id

    var params = {
      TableName : 'todo',
      Key: { id }
    };    
    
    const results = await dynamo.delete(params).promise();
    
    const statusCode = 200
    
    const headers = { "Access-Control-Allow-Origin":"*" }
    
    const response = { statusCode, body:'', headers };

    return response;
};

```


#### getTodo

```
//GET /todos/{id} => API Gateway => Proxy Integration REST API
//Lamdba function 

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const id = event.pathParameters.id
    
    console.log(event)

    var params = {
      TableName : 'todo',
      Key: { id }
    };    
    
    const results = await dynamo.get(params).promise();
    
    const statusCode = 200
    
    const body = JSON.stringify(results.Item)
    
    const headers = { "Access-Control-Allow-Origin":"*" }
    
    const response = { statusCode, body, headers };

    return response;
};

// const AWS = require('aws-sdk');
// const dynamo = new AWS.DynamoDB.DocumentClient();

// exports.handler =  function(event, context, callback) {

//     const id = event.pathParameters.id
    
//     console.log(event)
    
//     //console.log(event.requestContext.authorizer.claims['cognito:username'])

//     var params = {
//       TableName : 'todo',
//       Key: { id }
//     };    
    
//     dynamo.get(params, function(err, data) {
//       if (err) {
//         console.log(err);
//         callback(Error(err))
//       } else {
//         console.log(data);
//         const statusCode = 200
        
//         const body = JSON.stringify(data.Item)
        
//         const headers = { "Access-Control-Allow-Origin":"*" }
        
//         const response = { statusCode, body, headers };
    
//         callback(null, response);

//       }
//     });

// };

```

#### listTodos

```
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
      TableName : 'todo',
      FilterExpression : 'username = :username',
      ExpressionAttributeValues : {':username' : username}
    };
    
    
    const results = await dynamo.scan(params).promise();
    
    const statusCode = 200
    
    const body = JSON.stringify(results.Items)
    
    const headers = { "Access-Control-Allow-Origin":"*" }
    
    const response = { statusCode, body, headers };
    
    return response;
};

```

### API Gateways

#### HelloWorldRest

```
openapi: "3.0.1"
info:
  title: "HelloWorldRest"
  version: "2020-09-04T09:48:04Z"
servers:
- url: "https://yduogfbqz7.execute-api.us-east-1.amazonaws.com/{basePath}"
  variables:
    basePath:
      default: "/dev"
paths:
  /hello-world:
    get:
      responses:
        200:
          description: "200 response"
          headers:
            CORS_HEADER:
              schema:
                type: "string"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      security:
      - api_key: []
      x-amazon-apigateway-integration:
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:helloWorldRest/invocations"
        responses:
          default:
            statusCode: "200"
        requestTemplates:
          application/json: "#set($allParams = $input.params())\n{\n\"body-json\"\
            \ : $input.json('$'),\n\"params\" : {\n#foreach($type in $allParams.keySet())\n\
            \    #set($params = $allParams.get($type))\n\"$type\" : {\n    #foreach($paramName\
            \ in $params.keySet())\n    \"$paramName\" : \"$util.escapeJavaScript($params.get($paramName))\"\
            \n        #if($foreach.hasNext),#end\n    #end\n}\n    #if($foreach.hasNext),#end\n\
            #end\n}\n}\n"
        passthroughBehavior: "when_no_templates"
        httpMethod: "POST"
        contentHandling: "CONVERT_TO_TEXT"
        type: "aws"
    post:
      parameters:
      - name: "query1"
        in: "query"
        required: true
        schema:
          type: "string"
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Todo"
        required: true
      responses:
        200:
          description: "200 response"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      x-amazon-apigateway-request-validator: "Validate body, query string parameters,\
        \ and headers"
      x-amazon-apigateway-integration:
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:helloWorldRest/invocations"
        responses:
          default:
            statusCode: "200"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        contentHandling: "CONVERT_TO_TEXT"
        type: "aws"
  /hello-world-proxy-integration:
    get:
      responses:
        200:
          description: "200 response"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      x-amazon-apigateway-integration:
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:helloWorldRest/invocations"
        responses:
          default:
            statusCode: "200"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        contentHandling: "CONVERT_TO_TEXT"
        type: "aws_proxy"
components:
  schemas:
    Todo:
      title: "Todo Schema"
      required:
      - "id"
      type: "object"
      properties:
        id:
          type: "integer"
        description:
          type: "string"
    Empty:
      title: "Empty Schema"
      type: "object"
  securitySchemes:
    api_key:
      type: "apiKey"
      name: "x-api-key"
      in: "header"
x-amazon-apigateway-gateway-responses:
  BAD_REQUEST_BODY:
    statusCode: 400
    responseParameters:
      gatewayresponse.header.ERROR_TYPE: "'BAD_REQUEST'"
    responseTemplates:
      application/json: "{\"message\":$context.error.messageString,\n\"description\"\
        :\"Something Else\"}"
x-amazon-apigateway-request-validators:
  Validate body, query string parameters, and headers:
    validateRequestParameters: true
    validateRequestBody: true

```

#### HelloWorldHttp

```
openapi: "3.0.1"
info:
  title: "HelloWorldHttp"
  version: "2020-09-17 12:44:11UTC"
servers:
- url: "https://8nhzb6e6w0.execute-api.us-east-1.amazonaws.com/{basePath}"
  variables:
    basePath:
      default: ""
paths:
  /helloWorldHttp:
    get:
      responses:
        default:
          description: "Default response for GET /helloWorldHttp"
      x-amazon-apigateway-integration:
        payloadFormatVersion: "2.0"
        type: "aws_proxy"
        httpMethod: "POST"
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:helloWorldHttp/invocations"
        connectionType: "INTERNET"
    post:
      responses:
        default:
          description: "Default response for POST /helloWorldHttp"
      x-amazon-apigateway-integration:
        payloadFormatVersion: "2.0"
        type: "aws_proxy"
        httpMethod: "POST"
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:helloWorldHttp/invocations"
        connectionType: "INTERNET"
x-amazon-apigateway-importexport-version: "1.0"

```

#### TodoApiRest

```
openapi: "3.0.1"
info:
  title: "TodoApiRest"
  version: "2020-09-07T07:13:02Z"
servers:
- url: "https://cagzcajq30.execute-api.us-east-1.amazonaws.com/{basePath}"
  variables:
    basePath:
      default: "/dev"
paths:
  /todos:
    get:
      responses:
        200:
          description: "200 response"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      security:
      - CognitoTodoAuthorizer: []
      x-amazon-apigateway-integration:
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:listTodos/invocations"
        responses:
          default:
            statusCode: "200"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        contentHandling: "CONVERT_TO_TEXT"
        type: "aws_proxy"
    post:
      responses:
        200:
          description: "200 response"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      security:
      - CognitoTodoAuthorizer: []
      x-amazon-apigateway-integration:
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:createTodo/invocations"
        responses:
          default:
            statusCode: "200"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        contentHandling: "CONVERT_TO_TEXT"
        type: "aws_proxy"
    options:
      responses:
        200:
          description: "200 response"
          headers:
            Access-Control-Allow-Origin:
              schema:
                type: "string"
            Access-Control-Allow-Methods:
              schema:
                type: "string"
            Access-Control-Allow-Headers:
              schema:
                type: "string"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      x-amazon-apigateway-integration:
        responses:
          default:
            statusCode: "200"
            responseParameters:
              method.response.header.Access-Control-Allow-Methods: "'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'"
              method.response.header.Access-Control-Allow-Headers: "'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token'"
              method.response.header.Access-Control-Allow-Origin: "'*'"
        requestTemplates:
          application/json: "{\"statusCode\": 200}"
        passthroughBehavior: "when_no_match"
        type: "mock"
  /todos/{id}:
    get:
      parameters:
      - name: "id"
        in: "path"
        required: true
        schema:
          type: "string"
      responses:
        200:
          description: "200 response"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      security:
      - CognitoTodoAuthorizer: []
      x-amazon-apigateway-integration:
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:getTodo/invocations"
        responses:
          default:
            statusCode: "200"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        contentHandling: "CONVERT_TO_TEXT"
        type: "aws_proxy"
    put:
      parameters:
      - name: "id"
        in: "path"
        required: true
        schema:
          type: "string"
      responses:
        200:
          description: "200 response"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      security:
      - CognitoTodoAuthorizer: []
      x-amazon-apigateway-integration:
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:updateTodo/invocations"
        responses:
          default:
            statusCode: "200"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        contentHandling: "CONVERT_TO_TEXT"
        type: "aws_proxy"
    delete:
      parameters:
      - name: "id"
        in: "path"
        required: true
        schema:
          type: "string"
      responses:
        200:
          description: "200 response"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      security:
      - CognitoTodoAuthorizer: []
      x-amazon-apigateway-integration:
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:deleteTodo/invocations"
        responses:
          default:
            statusCode: "200"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        contentHandling: "CONVERT_TO_TEXT"
        type: "aws_proxy"
    options:
      responses:
        200:
          description: "200 response"
          headers:
            Access-Control-Allow-Origin:
              schema:
                type: "string"
            Access-Control-Allow-Methods:
              schema:
                type: "string"
            Access-Control-Allow-Headers:
              schema:
                type: "string"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
      x-amazon-apigateway-integration:
        responses:
          default:
            statusCode: "200"
            responseParameters:
              method.response.header.Access-Control-Allow-Methods: "'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'"
              method.response.header.Access-Control-Allow-Headers: "'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token'"
              method.response.header.Access-Control-Allow-Origin: "'*'"
        requestTemplates:
          application/json: "{\"statusCode\": 200}"
        passthroughBehavior: "when_no_match"
        type: "mock"
components:
  schemas:
    Empty:
      title: "Empty Schema"
      type: "object"
  securitySchemes:
    CognitoTodoAuthorizer:
      type: "apiKey"
      name: "Authorization"
      in: "header"
      x-amazon-apigateway-authtype: "cognito_user_pools"
      x-amazon-apigateway-authorizer:
        providerARNs:
        - "arn:aws:cognito-idp:us-east-1:825148403966:userpool/us-east-1_GMdZm52Wh"
        type: "cognito_user_pools"

```

#### TodoApiHttp

```
openapi: "3.0.1"
info:
  title: "TodoApiHttp"
  version: "2020-09-07T07:13:02Z"
servers:
- url: "https://nnvr7ppuc1.execute-api.us-east-1.amazonaws.com/{basePath}"
  variables:
    basePath:
      default: ""
paths:
  /todos/{id}:
    get:
      responses:
        default:
          description: "Default response for GET /todos/{id}"
      security:
      - TodoJWTAuthorizer: []
      x-amazon-apigateway-integration:
        payloadFormatVersion: "2.0"
        type: "aws_proxy"
        httpMethod: "POST"
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:getTodo/invocations"
        connectionType: "INTERNET"
    put:
      responses:
        default:
          description: "Default response for PUT /todos/{id}"
      security:
      - TodoJWTAuthorizer: []
      x-amazon-apigateway-integration:
        payloadFormatVersion: "2.0"
        type: "aws_proxy"
        httpMethod: "POST"
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:updateTodo/invocations"
        connectionType: "INTERNET"
    delete:
      responses:
        default:
          description: "Default response for DELETE /todos/{id}"
      security:
      - TodoJWTAuthorizer: []
      x-amazon-apigateway-integration:
        payloadFormatVersion: "2.0"
        type: "aws_proxy"
        httpMethod: "POST"
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:deleteTodo/invocations"
        connectionType: "INTERNET"
    options:
      responses:
        default:
          description: "Default response for OPTIONS /todos/{id}"
  /todos:
    get:
      responses:
        default:
          description: "Default response for GET /todos"
      security:
      - TodoJWTAuthorizer: []
      x-amazon-apigateway-integration:
        payloadFormatVersion: "2.0"
        type: "aws_proxy"
        httpMethod: "POST"
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:listTodos/invocations"
        connectionType: "INTERNET"
    post:
      responses:
        default:
          description: "Default response for POST /todos"
      security:
      - TodoJWTAuthorizer: []
      x-amazon-apigateway-integration:
        payloadFormatVersion: "2.0"
        type: "aws_proxy"
        httpMethod: "POST"
        uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:825148403966:function:createTodo/invocations"
        connectionType: "INTERNET"
    options:
      responses:
        default:
          description: "Default response for OPTIONS /todos"
components:
  securitySchemes:
    TodoJWTAuthorizer:
      type: "oauth2"
      flows: {}
      x-amazon-apigateway-authorizer:
        identitySource: "$request.header.authorization"
        jwtConfiguration:
          audience:
          - "7h6ivmhtdrfduhu4jjvfjqtduo"
          issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GMdZm52Wh"
        type: "jwt"
x-amazon-apigateway-cors:
  allowMethods:
  - "*"
  allowHeaders:
  - "*"
  maxAge: 0
  allowCredentials: false
  allowOrigins:
  - "*"
x-amazon-apigateway-importexport-version: "1.0"

```