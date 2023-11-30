import { SESClient } from "@aws-sdk/client-ses";
// Set the AWS Region.
const REGION = process.env.AWS_REGION || "us-east-1";

const sesClient = new SESClient({ region: REGION });
export { sesClient };