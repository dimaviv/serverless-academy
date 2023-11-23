import {APIGatewayProxyHandler} from "aws-lambda";

export const shortenLink: APIGatewayProxyHandler = async (event, _context) => {
    console.log(event)
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Protected endpoint accessed successfully!' }),
    };
};
