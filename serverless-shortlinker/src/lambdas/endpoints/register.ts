import bcrypt from 'bcryptjs';
import {Dynamo} from "../common/Dynamo";
import { v4 as uuidv4 } from 'uuid';
import {generateJWE} from "../common/utils/jwt-utils";


export const register = async (event) => {
    try {
        console.log("event", event);
        const { email, password } = JSON.parse(event.body);

        const isExists = await Dynamo.getUserByEmail(email)
        if (isExists) return {
            statusCode: 401,
            body: JSON.stringify({ message: 'User with such email already exists' }),
        }

        const id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Dynamo.write({id, email, password:hashedPassword}, process.env.USERS_TABLE)

        const token = await generateJWE({ sub:user.id, email: user.email })

        return {
            statusCode: 200,
            body: JSON.stringify({ token }),
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};