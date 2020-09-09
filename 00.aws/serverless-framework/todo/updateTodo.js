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
