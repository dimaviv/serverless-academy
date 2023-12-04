import type { AWS } from '@serverless/typescript';



const serverlessConfiguration: AWS = {
  service: 'serverless-shortlinker',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild',
    'serverless-create-global-dynamodb-table',
  ],

  useDotenv: true,
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
      JWT_SECRET: '${env:JWT_SECRET}',
      AWS_ACCOUNT_ID: '${aws:accountId}',
      API_GATEWAY_ID: { "Ref": "ApiGatewayRestApi" },
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      HOST_URL:
          {
            "Fn::Join":
                [
                  "",
                  [
                    "https://",
                    { "Ref": "ApiGatewayRestApi" },
                    ".execute-api.${aws:region}.amazonaws.com/${sls:stage}",
                  ],
                ],
          }
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
    scheduledDeactivateLink:{
      handler: 'src/lambdas/scheduledTasks/deactivateLink.scheduleDeactivateLink'
    },
    login: {
      handler:'src/lambdas/auth/login.login',
      events: [{
        http:{
          path:'login',
          method:'post',
          cors: true,
        }
      }]
    },
    register: {
      handler:'src/lambdas/auth/register.register',
      events: [{
        http:{
          path:'register',
          method:'post',
          cors: true,
        }
      }]
    },
    authorizer: {
      handler:'src/lambdas/auth/authorization.authorization',
    },
    shortenLink:{
      handler:'src/lambdas/links/shortenLink.shortenLink',
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
      handler:'src/lambdas/links/redirect.redirect',
      events: [{
        http:{
          path:'{linkId}',
          method:'get',
          cors: true,
        }
      }]
    },
    getUserLinks:{
      handler:'src/lambdas/links/getUserLinks.getUserLinks',
      events: [{
        http:{
          path:'link/user',
          method:'get',
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
    deactivateLink:{
      handler:'src/lambdas/links/deactivateLink.deactivateLink',
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
    sendLinkDeactivationEmail:{
      handler:'src/lambdas/listeners/sendLinkDeactivationEmail.sendLinkDeactivationEmail',
      events: [{
        sqs:{
          arn: {
            'Fn::GetAtt': ['NotificationQueue', 'Arn'],
          },
          batchSize: 10,
          maximumBatchingWindow:40,
        }
      }],
    },
  },
  package: { individually: true },
  custom: {
    usersTable: 'users',
    linksTable: 'links',
    globalTables:{
      version: 'v2',
      regions: ['eu-central-1', 'eu-north-1'],
      createStack: false,
    },
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
      NotificationQueue:{
        Type: 'AWS::SQS::Queue',
        Properties:{
          QueueName: 'NotificationQueue',
        }
      },
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
         // BillingMode: 'PAY_PER_REQUEST',
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
         // BillingMode: 'PAY_PER_REQUEST',
          ProvisionedThroughput: {
            ReadCapacityUnits: 2,
            WriteCapacityUnits: 2,
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
              ReadCapacityUnits: 2,
              WriteCapacityUnits: 2,
            },
          }],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
