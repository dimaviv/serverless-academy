import AWS from "aws-sdk";
import {AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY} from "../config.env.js";

AWS.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});


const ddb = new AWS.DynamoDB.DocumentClient();

class DynamoDbRepository {
    async saveJson(key, json) {
        try {
            const params = {
                TableName: 'json_storage',
                Item: {
                    key: key,
                    json: JSON.stringify(json)
                }
            };
            await ddb.put(params).promise();
            return {success:true};
        }catch (e) {
            throw new Error("Error saving data")
        }
    };

    async readJson(key) {
        try {
            const params = {
                TableName: 'json_storage',
                Key: {
                    key,
                },
            };
            const {Item = {}} = await ddb.get(params).promise();
            return {success:true, data: JSON.parse(Item.json)}
        }catch (e) {
            throw new Error("Error reading data")
        }
    }
}

export default new DynamoDbRepository();
