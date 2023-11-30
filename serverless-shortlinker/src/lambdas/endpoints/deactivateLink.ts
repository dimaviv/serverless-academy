import {Dynamo} from "../common/Dynamo";
import {verifyToken} from "../common/utils/jwt-utils";
import {Responses} from "../common/API_Responses";


export const deactivateLink = async (event) => {
    const { linkId } = event.pathParameters;
    console.log(linkId)
    const user = await verifyToken(event.headers.Authorization.split(' ')[1])

    const deactivatedLink = await deactivateLinkById(linkId, user.id)

    return Responses._200({ success:!!deactivatedLink, updatedLink: deactivatedLink })
};


export const deactivateLinkById = async (linkId, userId = null) => {
    const link = await Dynamo.getById(linkId, process.env.LINKS_TABLE)

    if (userId && link.userId !== userId){
        return Responses._401({ message: 'User is not the link owner' })
    }

    const updatedLink = {...link, isActive: false};

    return await Dynamo.putById(updatedLink, process.env.LINKS_TABLE)
}