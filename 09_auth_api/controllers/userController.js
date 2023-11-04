import ApiError from '../error/ApiError.js';
import userService from "../services/userService.js";
import {validateUserCreds} from "../utils/validationUtils.js";



class UserController {

    async getCurrentUser(req, res, next) {
        try {
            const user = await userService.getCurrentUser(req.user.sub);
            return res.json({success: true, data: {id: user.id, email: user.email}})
        } catch (e) {
            if (e instanceof ApiError) {
                next(e);
            } else {
                next(ApiError.internal(e.message))
            }
        }
    }

    async registration(req, res, next) {
        try {
            const {email, password} = req.body

            const validationErrors = await validateUserCreds(email, password)
            if (validationErrors){
                return next(ApiError.badRequest(`Validation error, ${validationErrors}`));
            }

            const data = await userService.registration(email, password)

            return res.status(201).json({success:true, data})

        } catch (e) {
            if (e instanceof ApiError) {
                next(e);
            } else {
                next(ApiError.internal(e.message))
            }
        }

    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body

            const validationErrors = await validateUserCreds(email, password)
            if (validationErrors){
                return next(ApiError.badRequest(`Validation error, ${validationErrors}`));
            }

            const data = await userService.login(email, password)

            return res.json({success:true, data})
        } catch (e) {
            if (e instanceof ApiError) {
                next(e);
            } else {
                next(ApiError.internal(e.message))
            }
        }

    }

    async refreshAccessToken(req, res, next) {
        try {
            const token = await userService.refreshAccessToken(req.body.refreshToken)
            return res.json({token})
        } catch (e) {
            if (e instanceof ApiError) {
                next(e);
            } else {
                next(ApiError.internal(e.message))
            }
        }
    }
}

export default new UserController()