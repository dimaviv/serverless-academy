import {Dynamo} from "@libs/dynamo-db";
import {verifyToken} from "../common/utils/jwt-utils";
import {APIResponse, Responses} from "../common/API_Responses";
import {sendMessageToSQS} from "@libs/queue-manager";
import {Link} from "../common/types/link.type";
import {User} from "../common/types/user.type";
import ApiError from "../common/ApiError";


export const deactivateLink = async (event): Promise<APIResponse> => {
    try {
        const { linkId } = event.pathParameters;
        console.log(linkId);

        const user: User = await verifyToken(event.headers.Authorization.split(' ')[1]);

        const deactivatedLink: Link | APIResponse = await deactivateLinkById(linkId, user.id);

        const notificationQueue = await queueDeactivationNotification(deactivatedLink);
        console.log(notificationQueue);

        return Responses._200({ success: !!deactivatedLink, updatedLink: deactivatedLink });
    }catch (e) {
        if (e instanceof ApiError){
            return Responses.error(e.status, e.message)
        }
        return Responses._500({ message: 'Internal Server Error' });
    }
};

export const queueDeactivationNotification = async (link: Link) => {
    const user: User | null = await Dynamo.getUserById(link.userId);

    if (!user) {
        throw ApiError.notFound( 'User not found')
    }

    const shortUrl = `${process.env.HOST_URL}/${link.id}`;
    const message = { email: user.email, shortUrl, originalUrl: link.url };

    return await sendMessageToSQS(message, 'NotificationQueue');
};


export const deactivateLinkById = async (linkId: string, userId?: string | null): Promise<Link> => {
    const link = await Dynamo.getLinkById(linkId);

    if (!link) {
        throw ApiError.badRequest( 'Link not found')
    }

    if (!link.isActive) {
        throw ApiError.badRequest( 'Link is already deactivated')
    }

    if (userId && link.userId !== userId) {
        throw ApiError.badRequest( 'User is not the link owner')
    }

    const updatedLink = { ...link, isActive: false };

    return Dynamo.putLinkById(updatedLink);
};

