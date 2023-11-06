import ApiError from './error/ApiError.js';
import * as fs from "fs/promises";
import {csvValueToInt, csvValueToStr, intIpToHRF, ipToInt} from "./helpers.js";

const ipToLocation = []

async function init(){
    try {
        const fileData = await fs.readFile('IP2LOCATION-LITE-DB1.CSV', 'utf8');
        const lines = fileData.split('\n');

        for (let line of lines){
            const data = line.split(',');
            if (!data[0]) break;
            const [ipFrom, ipTo, countryCode, country] = data;
            ipToLocation.push({ipFrom: csvValueToInt(ipFrom), ipTo: csvValueToInt(ipTo), countryCode, country});
        }
    }catch (e) {
        throw Error("Csv DB initialization error")
    }
}

await init()

class LocationController {

    async detectLocation(req, res, next) {
        try {

            // const userIP = "45.177.176.23"; // Mexico;
            // const userIP = req.headers['x-forwarded-for'];
            const userIP = req.ip;

            if (!userIP) return next(ApiError.badRequest("No IP address detected"))
            const userIPInt = ipToInt(userIP);

            let userLocation = 'Unknown';
            let ipFrom;
            let ipTo;

            let left = 0;
            let right = ipToLocation.length - 1;

            while (left <= right) {
                let mid = Math.floor((left + right) / 2);

                ipFrom = ipToLocation[mid].ipFrom;
                ipTo = ipToLocation[mid].ipTo;

                if (userIPInt >= ipFrom && userIPInt <= ipTo) {
                    userLocation = csvValueToStr(ipToLocation[mid].country);
                    break;
                } else if (userIPInt < ipFrom) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }

            const ipRange = intIpToHRF(ipFrom) + ' - ' + intIpToHRF(ipTo);

            res.json({ ipRange, country: userLocation });

        } catch (e) {
            if (e instanceof ApiError) {
                next(e);
            } else {
                next(ApiError.internal(e.message))
            }
        }
    }
}


export default new LocationController();






