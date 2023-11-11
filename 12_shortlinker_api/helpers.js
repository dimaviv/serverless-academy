import {customAlphabet } from 'nanoid'

export const generateShortId = async () => {
    const generateId = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);
    return generateId()
}