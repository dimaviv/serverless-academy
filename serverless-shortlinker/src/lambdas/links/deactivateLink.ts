import {Dynamo} from "../common/Dynamo";
import {verifyToken} from "../common/utils/jwt-utils";
import {Responses} from "../common/API_Responses";
import {sendMessageToSQS} from "@libs/queue-manager";


export const deactivateLink = async (event) => {
    const { linkId } = event.pathParameters;
    console.log(linkId)
    const user = await verifyToken(event.headers.Authorization.split(' ')[1])

    const deactivatedLink = await deactivateLinkById(linkId, user.id)
    const notificationQueue = await queueDeactivationNotification(deactivatedLink)
    console.log(notificationQueue)
    return Responses._200({ success:!!deactivatedLink, updatedLink: deactivatedLink })
};


export const queueDeactivationNotification = async (link) => {
    const user = await Dynamo.getById(link.userId, process.env.USERS_TABLE)
    const shortUrl = `${process.env.HOST_URL}/${link.id}`;
    const message = {email: user.email, shortUrl, originalUrl:link.url}

    return await sendMessageToSQS(message, 'NotificationQueue')
}


export const deactivateLinkById = async (linkId, userId = null) => {
    const link = await Dynamo.getById(linkId, process.env.LINKS_TABLE)

    if (!link.isActive) return Responses._400({ message: 'Link is already deactivated' })

    if (userId && link.userId !== userId){
        return Responses._401({ message: 'User is not the link owner' })
    }

    const updatedLink = {...link, isActive: false};

    return await Dynamo.putById(updatedLink, process.env.LINKS_TABLE)
}


