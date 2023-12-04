import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "@libs/ses-client";
import {SQSEvent} from "aws-lambda";


interface DeactivationMessage {
    email: string;
    shortUrl: string;
    originalUrl: string;
}

export const sendLinkDeactivationEmail = async (event: SQSEvent) => {
    console.log('event', event);
    const sqsMessages: DeactivationMessage[] = event.Records.map((record) => JSON.parse(record.body));

    const promises = sqsMessages.map((msg) => {
        const { email, shortUrl, originalUrl } = msg;
        const emailText = `Your link ${shortUrl} is no longer active.
        The resource (${originalUrl}) can't be accessed by it.`;
        console.log(msg);
        return sendEmailNotification(emailText, email);
    });

    const result = await Promise.all(promises);
    console.log(result);
    return result;
};


const sendEmailNotification = async (message: string, address: string) : Promise<void> => {
    const sendEmailCommand  = new SendEmailCommand({
        Destination:{
            ToAddresses:[address]
        },
        Message: {
            Body: {
                Text: {Data: message}
            },
            Subject: {Data: 'Link deactivation'}
        },
        Source: 'devmail8778@gmail.com'
    })
    try {
        await sesClient.send(sendEmailCommand);
        console.log('email sending success')
    } catch (e) {
        console.log('error', e);
    }
}

