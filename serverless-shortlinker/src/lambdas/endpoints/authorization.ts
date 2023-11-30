import {verifyToken} from "../common/utils/jwt-utils";


export const authorization = async (event, _context, callback) => {
    try {
        const token = event.authorizationToken.split(' ')[1];
        const methodArn = event.methodArn;

        if (!token || !methodArn) return callback("No token or arn method");

        const decodedToken = await verifyToken(token);
        const policy = generatePolicy(decodedToken.sub, 'Allow', event.methodArn)

        if (decodedToken && decodedToken.sub) {
            return callback(null, policy);
        } else {
            return callback('Unauthorized');
        }
    }catch (e) {
        return callback('Unauthorized');
    }
}

const generatePolicy = (userId: string, effect: string, resource: string) => {
    const policyDocument = {
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource,
            },
        ],
    };

    return {
        principalId: userId,
        policyDocument,
    };
};
