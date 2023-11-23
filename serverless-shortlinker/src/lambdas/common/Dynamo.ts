import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({});
const dynamoDBClient = DynamoDBDocumentClient.from(client);

export const Dynamo = {


    async write(data: any, TableName: string) {
        if (!data.id) {
            throw new Error('No id on the data');
        }
        console.log(data, TableName)
        const command = new PutCommand({
            TableName,
            Item: data,
        });

        const response = await dynamoDBClient.send(command);
        if (!response) {
            throw new Error(`There was an error inserting id of ${data.id} in table ${TableName}`);
        }

        return data;
    },

    async getUserByEmail(email: string, TableName: string = process.env.USERS_TABLE) {
        const command = new ScanCommand({
            TableName,
            FilterExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email,
            },
            ConsistentRead: true,
                });

        const data = await dynamoDBClient.send(command);
        console.log(data)
        console.log(data.Items[0])
        if (!data) console.log('Data was not found by email');
        return data.Items[0];
    }
};