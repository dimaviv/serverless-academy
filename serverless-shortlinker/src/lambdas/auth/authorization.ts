import {verifyToken} from "../common/utils/jwt-utils";


export const authorization = async (event, _context, callback) => {
    try {
        const token = event.authorizationToken.split(' ')[1];
        const methodArn = event.methodArn;
        console.log('123')
        if (!token || !methodArn) return callback("No token or arn method");

        const decodedToken = await verifyToken(token);
        const policy = generatePolicy(decodedToken.sub, 'Allow')

        if (decodedToken && decodedToken.sub) {
            return callback(null, policy);
        } else {
            return callback('Unauthorized');
        }
    }catch (e) {
        return callback('Unauthorized');
    }
}

const generatePolicy = (userId: string, effect: string) => {
    const prefix = `arn:aws:execute-api:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:${process.env.API_GATEWAY_ID}/*`
    const policyDocument = {
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: [
                    `${prefix}/POST/link/deactivate/*`,
                    `${prefix}/POST/link/shorten`,
                    `${prefix}/GET/link/user`,
                ],
            },
        ],
    };

    return {
        principalId: userId,
        policyDocument,
    };
};
