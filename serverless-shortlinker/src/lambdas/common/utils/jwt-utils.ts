import * as jwt from 'jsonwebtoken';

export const generateJWE = async (payload: {}) => {
    return jwt.sign({...payload}, process.env.JWT_SECRET, {
        expiresIn: '1h',
        algorithm: 'HS256',
        header: {
            typ: 'JWT',
            alg: 'HS256',
        },
    });
}
export const verifyToken = async (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};