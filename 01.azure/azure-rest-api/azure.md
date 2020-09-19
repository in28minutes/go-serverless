<!---
Current Directory : /in28Minutes/git/go-serverless/01.azure/azure-rest-api
-->

## Complete Code Example


### /host.json

```json
{
  "version": "2.0"
}
```
---

### /deleteTodo/function.json

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "delete"
      ],
      "route": "todos/{id}"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```
---

### /deleteTodo/index.js

```js
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

module.exports = async function (context, req) {

    //req.body
    const URL = process.env.MONGODB_URL;
    const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;//'serverless'
    const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;//'todos'

    const connection = await MongoClient.connect(URL)
    const todoCollection = connection.db(DATABASE_NAME)
        .collection(COLLECTION_NAME)

    const results = await todoCollection
        .deleteOne(
            { _id: ObjectId(req.params.id) }
        )

    await connection.close()

    return {
        body: '{"message":"success"}'
    };

}
```
---

### /deleteTodo/sample.dat

```
{
    "name": "Azure"
}
```
---

### /listTodos/function.json

```json
{
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "get"
      ],
      "route": "todos"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```
---

### /listTodos/index.js

```js
const MongoClient = require('mongodb').MongoClient;

module.exports = async function (context, req) {

    const URL = process.env.MONGODB_URL;
    const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;//'serverless'
    const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;//'todos'

    const connection = await MongoClient.connect(URL)
    const todoCollection = connection.db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
    const results = await todoCollection
        .find({ username: "in28minutes" })
        .toArray()

    await connection.close()

    return {
        body: JSON.stringify(results).replace(/_id/g, "id")
    };
}
```
---

### /listTodos/sample.dat

```
{
    "name": "Azure"
}
```
---

### /createTodo/function.json

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "post"
      ],
      "route": "todos"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```
---

### /createTodo/index.js

```js
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

module.exports = async function (context, req) {
    //req.body
    const URL = process.env.MONGODB_URL;
    const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;//'serverless'
    const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;//'todos'

    const connection = await MongoClient.connect(URL)
    const todoCollection = connection.db(DATABASE_NAME)
        .collection(COLLECTION_NAME)

    let body = req.body

    delete body.id;

    const results = await todoCollection
        .insertOne(body)

    await connection.close()

    return {
        body: '{"message":"success"}'
    };

}
```
---

### /createTodo/sample.dat

```
{
    "name": "Azure"
}
```
---

### /updateTodo/function.json

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "put"
      ],
      "route": "todos/{id}"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```
---

### /updateTodo/index.js

```js
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

module.exports = async function (context, req) {
    //req.body
    const URL = process.env.MONGODB_URL;
    const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;//'serverless'
    const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;//'todos'

    const connection = await MongoClient.connect(URL)
    const todoCollection = connection.db(DATABASE_NAME)
        .collection(COLLECTION_NAME)

    const results = await todoCollection
        .updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: req.body }
        )

    await connection.close()

    return {
        body: '{"message":"success"}'
    };

}
```
---

### /updateTodo/sample.dat

```
{
    "name": "Azure"
}
```
---

### /local.settings.json

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "MONGODB_URL": "mongodb://cosmosdb-todos:PuoYAZTOwMO63akJdMwyKZNgnh6qfqMYMB4OQoZL7JZ32qf4azD2B6HZaBFImAuOB3p2VsTrSIsaOPbWStsSuA%3D%3D@cosmosdb-todos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosdb-todos@",
    "MONGODB_DATABASE_NAME": "serverless",
    "MONGODB_COLLECTION_NAME": "todos"
  },
  "Host": {
    "CORS": "*"
  }
}
```
---

### /proxies.json

```json
{
  "$schema": "http://json.schemastore.org/proxies",
  "proxies": {}
}
```
---

### /getTodo/function.json

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "get"
      ],
      "route": "todos/{id}"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```
---

### /getTodo/index.js

```js
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

module.exports = async function (context, req) {
    //
    const URL = process.env.MONGODB_URL;
    const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;//'serverless'
    const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;//'todos'

    const connection = await MongoClient.connect(URL)
    const todoCollection = connection.db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
    const results = await todoCollection
        .findOne(ObjectId(req.params.id))

    await connection.close()

    return {
        body: JSON.stringify(results).replace(/_id/g, "id")
    };

}
```
---

### /getTodo/sample.dat

```
{
    "name": "Azure"
}
```
---

### /package.json

```json
{
  "name": "azure-rest-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mongodb": "^3.6.2"
  }
}
```
---
