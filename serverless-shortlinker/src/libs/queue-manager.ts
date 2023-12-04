import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs"

const REGION = process.env.AWS_REGION || "us-east-1";

const sqs = new SQSClient({ region: REGION });



export const sendMessageToSQS = async (message, queue) => {
    const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/231892135743/${queue}`,
    };

    try {
        const command = new SendMessageCommand(params);
        const response = await sqs.send(command);
        console.log('Message sent to SQS successfully:', response.MessageId);
    } catch (error) {
        console.error('Error sending message to SQS:', error);
    }
};