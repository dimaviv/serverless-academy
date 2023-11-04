import userRepository from "../repositories/users.js";
import bcrypt from "bcrypt";
import {generateJWT, generateJWTs} from "../utils/jwtUtils.js";
import jwt from "jsonwebtoken";
import {JWT_SECRET_KEY} from "../config.env.js";
import ApiError from "../error/ApiError.js";


class UserService{

    async getCurrentUser(id) {
        return await userRepository.getUserById(id);
    }

    async registration(email, password) {
        const candidate = await userRepository.getUserByEmail(email)
        if (candidate) {
            throw ApiError.conflict('User with such email already exists');
        }

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await userRepository.createUser({ email, password: hashPassword})

        const {accessToken, refreshToken} = await generateJWTs(user.id, user.email)

        await userRepository.setRefreshToken(user.id, refreshToken);

        return {
            id: user.id,
            accessToken,
            refreshToken,
        }
    }

    async login(email, password) {
        const user = await userRepository.getUserByEmail(email)
        if (!user) {
            throw ApiError.notFound('User with such email was not found');
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            throw ApiError.badRequest('Incorrect password');
        }
        const {accessToken, refreshToken} = await generateJWTs(user.id, user.email)

        return {
            id: user.id,
            accessToken,
            refreshToken,
        };
    }

    async refreshAccessToken(refreshToken) {
        const user = jwt.verify(refreshToken, JWT_SECRET_KEY)
        return await generateJWT(user.id, user.email)
    }
}

export default new UserService()