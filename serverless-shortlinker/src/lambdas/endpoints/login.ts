import bcrypt from 'bcryptjs';
import {Dynamo} from "../common/Dynamo";
import {generateJWE} from "../common/utils/jwt-utils";
import {Responses} from "../common/API_Responses";



export const login = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        const user = await Dynamo.getUserByEmail(email)

        if (!user) {
            return Responses._400({ message: 'Invalid credentials' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {

            const token = await generateJWE({ sub:user.id, email: user.email })
            return Responses._200({token})
        } else {
            return Responses._401({message: 'Invalid credentials'})
        }
    } catch (error) {
        console.log(error)
        return Responses._500({ message: 'Internal Server Error' })

    }
};
