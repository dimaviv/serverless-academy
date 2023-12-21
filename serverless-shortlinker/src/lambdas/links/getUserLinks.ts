import {Dynamo} from "@libs/dynamo-db";
import {verifyToken} from "../common/utils/jwt-utils";
import {APIResponse, Responses} from "../common/API_Responses";
import ApiError from "../common/ApiError";



export const getUserLinks = async (event): Promise<APIResponse> => {
    try {
        const user = await verifyToken(event.headers.Authorization.split(' ')[1]);

        const links = await Dynamo.getUserLinks(user.sub);

        return Responses._200({ links });
    }catch (e) {
        if (e instanceof ApiError){
            return Responses.error(e.status, e.message)
        }
        return Responses._500({ message: 'Internal Server Error' });
    }
};