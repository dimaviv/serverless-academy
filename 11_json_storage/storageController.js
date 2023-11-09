import ApiError from './error/ApiError.js';
import storageService from "./storageService.js";



class StorageController {

    async putJson(req, res, next) {
        try {
            const json_path = req.params.json_path
            const {data} = req.body

            const success = await storageService.saveJson(json_path, data)

            return res.json(success)
        } catch (e) {
            if (e instanceof ApiError) {
                next(e);
            } else {
                next(ApiError.internal(e.message))
            }
        }
    }

    async getJson(req, res, next) {
        try {
            const json_path = req.params.json_path
            const json = await storageService.readJson(json_path)
            return res.json(json)
        } catch (e) {
            if (e instanceof ApiError) {
                next(e);
            } else {
                next(ApiError.internal(e.message))
            }
        }
    }
}


export default new StorageController();






