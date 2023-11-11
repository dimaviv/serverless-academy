import {generateShortId} from "./helpers.js";
import linkRepository from "./linkRepository.js"
import {APP_URL} from "./config.env.js";


class LinkController {

    async shortenLink(fullLink) {
        try {
            const shortId = await generateShortId();
            const link = await linkRepository.createLink({fullLink, shortId})
            const shortLink = APP_URL + link.shortId;
            return {success:true, shortLink};
        } catch (e) {
           throw new Error("Error while shortening the link")
        }
    }

    async getFullLink(shortId){
        try {
            const link = await linkRepository.getFullLink(shortId)
            return link.fullLink;
        } catch (e) {
            throw new Error("Error getting full link")
        }
    }

    async isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    async isUrlAccessible(url, timeout = 5000){
        try {
            const responsePromise = fetch(url);
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), timeout)
            );

            const response = await Promise.race([responsePromise, timeoutPromise]);

            return response.status < 400;
        } catch (error) {
            return false;
        }
    }

}


export default new LinkController();