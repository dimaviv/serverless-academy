export const APP_PORT = process.env.APP_PORT  || "5000"

// Selecting the approach of storing json
export const STORAGE_TYPE = process.env.STORAGE_TYPE  || "filesystem"   // 'filesystem', 'dynamodb',  default: filesystem

// AWS credentials for using DynamoDB
export const AWS_REGION = process.env.AWS_REGION  || "eu-north-1"
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID  || "AKIATL7OZF474CEAYC6Y"
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY  || "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"

