import bcrypt from 'bcryptjs';
import {Dynamo} from "../common/Dynamo";
import {generateJWE} from "../common/utils/jwt-utils";
import {APIResponse, Responses} from "../common/API_Responses";
import {User} from "../common/types/user.type";
import ApiError from "../common/ApiError";



export const login = async (event): Promise<APIResponse> => {
    try {
        const { email, password } = JSON.parse(event.body);

        if (!email || !password) {
            return Responses._400({ message: 'Email and password are required' });
        }

        const user: User | null = await Dynamo.getUserByEmail(email);

        if (!user) {
            return Responses._400({ message: 'Invalid credentials' });
        }

        const passwordMatch: boolean = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = await generateJWE({ sub: user.id, email: user.email });
            return Responses._200({ token });
        } else {
            return Responses._401({ message: 'Invalid credentials' });
        }
    }catch (e) {
        if (e instanceof ApiError){
            return Responses.error(e.status, e.message)
        }
        return Responses._500({ message: 'Internal Server Error' });
    }
};
