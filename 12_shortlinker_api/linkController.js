import ApiError from './error/ApiError.js';
import linkService from "./linkService.js";
import {APP_URL} from "./config.env.js";



class LinkController {

    async shortenLink(req, res, next) {
        try {
            const {link} = req.body

            if (!await linkService.isValidUrl(link)) {
                return next(ApiError.badRequest("Invalid URL format"))
            }
            if (!(await linkService.isUrlAccessible(link))) {
                return next(ApiError.notFound("URL is not accessible"))
            }

            const shortenLink = await linkService.shortenLink(link)
            return res.json(shortenLink)
        } catch (e) {
            if (e instanceof ApiError) {
                next(e);
            } else {
                next(ApiError.internal(e.message))
            }
        }
    }

    async linkRedirect(req, res, next) {
       try{
           const {shortId}  = req.params;
           const fullLink = await linkService.getFullLink(shortId);
           if (!fullLink) return res.redirect(APP_URL)
           return res.redirect(fullLink);
       }catch (e) {
           return res.redirect(APP_URL)
       }
    }

}


export default new LinkController();






