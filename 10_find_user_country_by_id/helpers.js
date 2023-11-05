import ApiError from "./error/ApiError.js";

export const ipToInt = (ip) => {
    return ip.split('.').reduce((int, octet) => (int << 8) + parseInt(octet, 10), 0) >>> 0;
}

export const intIpToHRF = (ip) => {
    return (
        (ip >>> 24) +
        '.' +
        (ip >> 16 & 255) +
        '.' +
        (ip >> 8 & 255) +
        '.' +
        (ip & 255)
    );
}

export const csvValueToInt = (str) => {
    let trimmedStr = str.replace(/"/g, '');
    let intValue = parseInt(trimmedStr);

    if (isNaN(intValue)) throw ApiError.internal("Error parsing csv value")

    return intValue;
}
export const csvValueToStr = (str) => {
    return str.replace(/"/g, '').replace('\r', '');
}
