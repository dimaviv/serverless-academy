import {Dynamo} from "../common/Dynamo";
import {deactivateLinkById} from "./deactivateLink";
import {APIResponse, Responses} from "../common/API_Responses";
import {Link} from "../common/types/link.type";
import ApiError from "../common/ApiError";


interface RedirectResponse {
    statusCode:number
    headers: {
        Location: string
    }
}


export const redirect = async (event): Promise<RedirectResponse | APIResponse> => {
    try {
        console.log(event);
        const { linkId } = event.pathParameters;
        console.log('linkId', linkId);

        const link: Link | null = await Dynamo.getLinkById(linkId);

        if (!link) {
            return Responses._400({ message: "Link not found" });
        }

        console.log(link);
        if (!link.isActive) {
            return Responses._400({ message: "Link is inactive" });
        }

        await countLinkVisit(link.id);

        if (link.expire === 'once') {
            await deactivateLinkById(link.id);
        }

        return {
            statusCode: 301,
            headers: {
                Location: link.url
            }
        };
    }catch (e) {
        if (e instanceof ApiError){
            return Responses.error(e.status, e.message)
        }
        return Responses._500({ message: 'Internal Server Error' });
    }
};

const countLinkVisit = async (linkId: string): Promise<void> => {
     await Dynamo.incrementNumericFieldById(linkId, 'visitCount', process.env.LINKS_TABLE as string);
};

