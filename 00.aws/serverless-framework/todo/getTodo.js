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
