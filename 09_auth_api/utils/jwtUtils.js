import jwt  from 'jsonwebtoken';
import {JWT_SECRET_KEY, ACCESS_TOKEN_TTL_MINUTES} from "../config.env.js";

export const generateJWTs = async (id, email) => {
    const accessToken = jwt.sign(
        {sub:id, email},
        JWT_SECRET_KEY,
        {expiresIn: `${ACCESS_TOKEN_TTL_MINUTES}m`}
    )
    const refreshToken = jwt.sign(
        {sub:id, email},
        JWT_SECRET_KEY,
    )
    return {accessToken, refreshToken}
}

export const generateJWT = async (id, email) => {
    return jwt.sign(
        {sub:id, email},
        JWT_SECRET_KEY,
        {expiresIn: `${ACCESS_TOKEN_TTL_MINUTES}m`}
    )
}

