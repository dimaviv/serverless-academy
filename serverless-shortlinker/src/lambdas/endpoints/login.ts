import bcrypt from 'bcryptjs';
import {Dynamo} from "../common/Dynamo";
import {generateJWE} from "../common/utils/jwt-utils";



export const login = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        const user = await Dynamo.getUserByEmail(email)

        if (!user) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid credentials' }),
            };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {

            const token = await generateJWE({ sub:user.id, email: user.email })

            return {
                statusCode: 200,
                body: JSON.stringify({ token }),
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid credentials' }),
            };
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
