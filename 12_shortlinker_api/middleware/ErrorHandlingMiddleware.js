import ApiError from '../error/ApiError.js';


// don't delete `next`
export default function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({success:false, error: err.message})
    }
    return res.status(500).json({message: "Unexpected error!"})
}