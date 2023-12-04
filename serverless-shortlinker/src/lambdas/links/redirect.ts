import {Dynamo} from "../common/Dynamo";
import {deactivateLinkById} from "./deactivateLink";
import {Responses} from "../common/API_Responses";


export const redirect = async (event) => {
    console.log(event)
    const { linkId } = event.pathParameters;
    console.log('linkId', linkId)
    const link = await Dynamo.getById(linkId, process.env.LINKS_TABLE)

    console.log(link)
    if (!link.isActive){
        return Responses._400({message:"Link is inactive"})
    }

    await countLinkVisit(link.id)

    if (link.expire === 'once'){
        await deactivateLinkById(link.id)
    }

     return  {
        statusCode: 301,
        headers: {
            Location: link.url
        }
    };

};

const countLinkVisit = async (linkId) => {
    return await Dynamo.incrementNumericFieldById(linkId, 'visitCount', process.env.LINKS_TABLE)
}

