import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "@libs/ses-client";
import {Responses} from "../common/API_Responses";
//import { SQSEvent, SQSHandler } from 'aws-lambda';

export const sendLinkDeactivationEmail = async (event) => {
    console.log('event', event)

    const {link, originalUrl} = {link:'link.url',
        originalUrl:'https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html'};

    const message = `Your link ${link} is no longer active.
    The resource (${originalUrl}) can't be accessed by it.`

    const sendEmailCommand  = new SendEmailCommand({
        Destination:{
            ToAddresses:['devmail8778@gmail.com']
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
       return Responses._200({message: 'email sent'})
    } catch (e) {
        console.log('error', e);
        return Responses._400({message: 'failed to sent the email'})
    }
};
