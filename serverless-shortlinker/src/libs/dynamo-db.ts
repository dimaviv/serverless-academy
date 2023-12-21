import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import {User} from "../lambdas/common/types/user.type";
import {Link} from "../lambdas/common/types/link.type";


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

    async getLinkById(id: string) {
        const command = new GetCommand({
            TableName: process.env.LINKS_TABLE,
            Key:{
                id
            },
        });

        const response = await dynamoDBClient.send(command);

        return response.Item as Link;
    },

    async getUserById(id: string) {
        const command = new GetCommand({
            TableName: process.env.USERS_TABLE,
            Key:{
                id
            },
        });

        const response = await dynamoDBClient.send(command);

        return response.Item as User;
    },

    async putLinkById(Item: {}) {
        const command = new PutCommand({
            TableName: process.env.LINKS_TABLE,
            Item
        });

        const response = await dynamoDBClient.send(command);
        if (response.$metadata.httpStatusCode !== 200) console.log(`Error putting data to table ${process.env.LINKS_TABLE}`)

        return Item as Link;
    },

    async incrementNumericFieldById(itemId: string, numericFieldName: string, TableName: string) {
        const updateExpression = `SET ${numericFieldName} = ${numericFieldName} + :increment`;
        const expressionAttributeValues = {
            ':increment': 1,
        };

        const command = new UpdateCommand({
            TableName,
            Key: {
                'id':itemId
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });

        try {
            const response = await dynamoDBClient.send(command);
            console.log(response)
            return {success:true};
        } catch (error) {
            console.error(`Error incrementing numeric field in table ${TableName}: ${error.message}`);
        }
    },

    async getUserByEmail(email: string) {
        const command = new QueryCommand({
            TableName: process.env.USERS_TABLE,
            IndexName: 'emailIndex',
            KeyConditionExpression: `email = :email`,
            ExpressionAttributeValues: {
                ':email': email,
            },
        });

        const data = await dynamoDBClient.send(command);
        console.log(data)
        if (!data.Items[0]) console.log('Data was not found by email');
        return data.Items[0] as User;
    },

    async getUserLinks(userId: string) {
        try {
            console.log(userId)
            const command = new QueryCommand({
                TableName: process.env.LINKS_TABLE,
                IndexName: 'userIdIndex',
                KeyConditionExpression: `userId = :userId`,
                ExpressionAttributeValues: {
                    ":userId": userId,
                },
            });

            const data = await dynamoDBClient.send(command);
            console.log(data);
            console.log(data.Items);
            if (!data.Items || data.Items.length === 0) {
                console.log('Links were not found by userId');
                return [];
            }
            return data.Items;
        }catch (e){
            console.error('Error fetching links for userId:', userId, e);
            return [];
        }
    }

};