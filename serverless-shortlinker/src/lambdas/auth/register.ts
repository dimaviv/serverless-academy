import bcrypt from 'bcryptjs';
import {Dynamo} from "@libs/dynamo-db";
import { v4 as uuidv4 } from 'uuid';
import {generateJWE} from "../common/utils/jwt-utils";
import {APIResponse, Responses} from "../common/API_Responses";
import {User} from "../common/types/user.type";
import ApiError from "../common/ApiError";



export const register = async (event): Promise<APIResponse> => {
    try {
        console.log("event", event);
        const { email, password } = JSON.parse(event.body);
        console.log("email", email);

        if (!email || !password) {
            return Responses._400({ message: 'Email and password are required' });
        }

        const isExists = await Dynamo.getUserByEmail(email);
        if (isExists) {
            return Responses._401({ message: 'User with such email already exists' });
        }

        const id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user: User = await Dynamo.write({ id, email, password: hashedPassword }, process.env.USERS_TABLE as string);

        const token = await generateJWE({ sub: user.id, email: user.email });

        return Responses._200({ token });
    }catch (e) {
        if (e instanceof ApiError){
            return Responses.error(e.status, e.message)
        }
        return Responses._500({ message: 'Internal Server Error' });
    }
};
