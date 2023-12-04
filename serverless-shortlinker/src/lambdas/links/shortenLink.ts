import {customAlphabet } from 'nanoid'
import {Dynamo} from "../common/Dynamo";
import {verifyToken} from "../common/utils/jwt-utils";
import {scheduleDeactivation} from "@libs/task-scheduler";
import {Responses} from "../common/API_Responses";
import {allowedExpireTimeInMinutes} from "../common/constants";


export const shortenLink = async (event) => {

    const { url, expire } = JSON.parse(event.body);
    const user = await verifyToken(event.headers.Authorization.split(' ')[1])

    const id = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();

    let expireAt = null;
    if (expire && expire !== 'once'){
        const min = allowedExpireTimeInMinutes[expire]
        expireAt = new Date(new Date().getTime() + min * 60000).toISOString();
    }

    const newLink = {id, url, userId: user.sub, createdAt: new Date().toISOString(), expire, expireAt, isActive:true, visitCount:0}

    const link = await Dynamo.write(newLink, process.env.LINKS_TABLE)
    console.log('link', link)
    const shortLink = `${process.env.HOST_URL}/${link.id}`;

    if (expireAt){
        const schedule = await scheduleDeactivation(link.id, expireAt, {id:link.id});
        console.log(schedule)
    }

    return Responses._200({ shortLink })
};


