# Todo

# Commands

```
  brew --version
  brew tap aws/tap
  brew install aws-sam-cli
  sam info
  sam --version
  sam --help
  sam init
  sam build
  aws configure
  sam deploy --guided
  sam validate
  sam build && sam deploy
  npm install -g serverless
  sudo npm install -g serverless
  serverless --version
  aws configure
  aws s3 ls
  serverless create --help
  serverless create --template aws-nodejs --name todo-serverless-framework
  serverless invoke -f hello
  serverless deploy
```

# Mapping Template

##  See http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html
##  This template will pass through all parameters including path, querystring, header, stage variables, and context through to the integration endpoint via the body/payload
#set($allParams = $input.params())
{
"body-json" : $input.json('$'),
"params" : {
#foreach($type in $allParams.keySet())
    #set($params = $allParams.get($type))
"$type" : {
    #foreach($paramName in $params.keySet())
    "$paramName" : "$util.escapeJavaScript($params.get($paramName))"
        #if($foreach.hasNext),#end
    #end
}
    #if($foreach.hasNext),#end
#end
},
"stage-variables" : {
#foreach($key in $stageVariables.keySet())
"$key" : "$util.escapeJavaScript($stageVariables.get($key))"
    #if($foreach.hasNext),#end
#end
},
"context" : {
    "account-id" : "$context.identity.accountId",
    "api-id" : "$context.apiId",
    "api-key" : "$context.identity.apiKey",
    "authorizer-principal-id" : "$context.authorizer.principalId",
    "caller" : "$context.identity.caller",
    "cognito-authentication-provider" : "$context.identity.cognitoAuthenticationProvider",
    "cognito-authentication-type" : "$context.identity.cognitoAuthenticationType",
    "cognito-identity-id" : "$context.identity.cognitoIdentityId",
    "cognito-identity-pool-id" : "$context.identity.cognitoIdentityPoolId",
    "http-method" : "$context.httpMethod",
    "stage" : "$context.stage",
    "source-ip" : "$context.identity.sourceIp",
    "user" : "$context.identity.user",
    "user-agent" : "$context.identity.userAgent",
    "user-arn" : "$context.identity.userArn",
    "request-id" : "$context.requestId",
    "resource-id" : "$context.resourceId",
    "resource-path" : "$context.resourcePath"
    }
}

## Event

2020-09-04T06:10:05.800Z	b60bd05c-2dc9-4b16-9ccd-aca12cd88e0d	INFO	{
  'body-json': {},
  params: {
    path: {},
    querystring: { query1: 'query-value1', query2: 'value2' },
    header: { header2: 'header-value2', header1: 'header-value1' }
  },
  'stage-variables': {},
  context: {
    'account-id': '825148403966',
    'api-id': 'yduogfbqz7',
    'api-key': 'test-invoke-api-key',
    'authorizer-principal-id': '',
    caller: 'AIDA4AHVNOD7JQBWBIKOK',
    'cognito-authentication-provider': '',
    'cognito-authentication-type': '',
    'cognito-identity-id': '',
    'cognito-identity-pool-id': '',
    'http-method': 'GET',
    stage: 'test-invoke-stage',
    'source-ip': 'test-invoke-source-ip',
    user: 'AIDA4AHVNOD7JQBWBIKOK',
    'user-agent': 'aws-internal/3 aws-sdk-java/1.11.848 Linux/4.9.217-0.1.ac.205.84.332.metal1.x86_64 OpenJDK_64-Bit_Server_VM/25.262-b10 java/1.8.0_262 vendor/Oracle_Corporation',
    'user-arn': 'arn:aws:iam::825148403966:user/in28minutes_dev',
    'request-id': '0315d69c-1d4a-4cb3-94ee-68f392765bd6',
    'resource-id': '1ykf2d',
    'resource-path': '/hello-world'
  }
}



