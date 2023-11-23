import type { AWS } from '@serverless/typescript';



const serverlessConfiguration: AWS = {
  service: 'serverless-shortlinker',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      USERS_TABLE: '${self:custom.usersTable}',
      LINKS_TABLE: '${self:custom.linksTable}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      JWT_SECRET: process.env.JWT_SECRET || 'defaultSecret',
    },
    iam:{
      role:{
        statements:[
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: '*',
          },
        ]}
    }
  },
  // import the function via paths
  functions: {
    login: {
      handler:'src/lambdas/endpoints/login.login',
      events: [{
        http:{
          path:'login',
          method:'post',
          cors: true,
        }
      }]
    },
    register: {
      handler:'src/lambdas/endpoints/register.register',
      events: [{
        http:{
          path:'register',
          method:'post',
          cors: true,
        }
      }]
    },
    authorizer: {
      handler:'src/lambdas/endpoints/authorization.authorization',
    },
    shortenLink:{
      handler:'src/lambdas/endpoints/shortenLink.shortenLink',
      events: [{
        http:{
          path:'link/shorten',
          method:'post',
          cors: true,
          authorizer: {
            name: 'authorizer',
            identitySource: 'method.request.header.Authorization',
            arn: {
              'Fn::GetAtt': ['AuthorizerLambdaFunction', 'Arn'],
            },
          },
        }
      }]
    },

  },
  package: { individually: true },
  custom: {
    usersTable: 'users1',
    linksTable: 'links',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      MyDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.usersTable}',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
