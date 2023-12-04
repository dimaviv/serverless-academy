import bcrypt from 'bcryptjs';
import {Dynamo} from "../common/Dynamo";
import { v4 as uuidv4 } from 'uuid';
import {generateJWE} from "../common/utils/jwt-utils";
import {Responses} from "../common/API_Responses";


export const register = async (event) => {
    try {
        console.log("event", event);
        const { email, password } = JSON.parse(event.body);
        console.log("email", email)
        const isExists = await Dynamo.getUserByEmail(email)
        if (isExists){
            return Responses._401({ message: 'User with such email already exists' })
        }

        const id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Dynamo.write({id, email, password:hashedPassword}, process.env.USERS_TABLE)

        const token = await generateJWE({ sub:user.id, email: user.email })

        return Responses._200({token})
    } catch (error) {
        console.log(error)
        return Responses._500({ message: 'Internal Server Error' })
    }
};