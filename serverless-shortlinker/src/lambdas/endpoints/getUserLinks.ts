import {Dynamo} from "../common/Dynamo";
import {verifyToken} from "../common/utils/jwt-utils";
import {Responses} from "../common/API_Responses";



export const getUserLinks = async (event) => {

    const user = await verifyToken(event.headers.Authorization.split(' ')[1])
    const links = await Dynamo.getUserLinks(user.id)

    return Responses._200({links})
};
