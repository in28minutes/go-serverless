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
