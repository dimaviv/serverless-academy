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
      JWT_SECRET: '${self:custom.secrets.JWT_SECRET}',
      AWS_ACCOUNT_ID: '${self:custom.AWS_ACCOUNT_ID}',
    },
    iam:{
      role:{
        statements:[
          {
            Effect: 'Allow',
            Action: "*",
            Resource: '*',
          },
        ]},
    }
  },
  // import the function via paths
  functions: {
    sendLinkDeactivationEmail:{
      handler: 'src/lambdas/scheduledTasks/sendLinkDeactivationEmail.sendLinkDeactivationEmail',
    },

    scheduledDeactivateLink:{
      handler: 'src/lambdas/scheduledTasks/deactivateLink.scheduleDeactivateLink'
    },
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
      }],
    },
    redirect:{
      handler:'src/lambdas/endpoints/redirect.redirect',
      events: [{
        http:{
          path:'{linkId}',
          method:'get',
          cors: true,
        }
      }]
    },
    deactivateLink:{
      handler:'src/lambdas/endpoints/deactivateLink.deactivateLink',
      events: [{
        http:{
          path:'link/deactivate/{linkId}',
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
    secrets: "${file(secrets.json)}",
    usersTable: 'users',
    linksTable: 'links',
    AWS_ACCOUNT_ID: 'x5vzbv22kk',
    AWS_REGION: 'us-east-1',
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
      UsersTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.usersTable}',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
            {
              AttributeName: 'email',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],

          GlobalSecondaryIndexes:[{
            IndexName: 'emailIndex',
            KeySchema:[{
              AttributeName: 'email',
              KeyType: 'HASH',
            }],
            Projection:{
              ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      },
      LinksTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.linksTable}',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
            {
              AttributeName: 'userId',
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
          GlobalSecondaryIndexes:[{
            IndexName: 'userIdIndex',
            KeySchema:[{
              AttributeName: 'userId',
              KeyType: 'HASH',
            }],
            Projection:{
              ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
          }]

        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
