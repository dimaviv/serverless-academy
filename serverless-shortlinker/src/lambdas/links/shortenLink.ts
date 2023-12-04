import {customAlphabet } from 'nanoid'
import {Dynamo} from "../common/Dynamo";
import {verifyToken} from "../common/utils/jwt-utils";
import {scheduleDeactivation} from "@libs/task-scheduler";
import {Responses} from "../common/API_Responses";


export const shortenLink = async (event) => {

    const { url, expire } = JSON.parse(event.body);
    const user = await verifyToken(event.headers.Authorization.split(' ')[1])

    const id = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();

    const newLink = {id, url, userId: user.sub, createdAt: new Date().toISOString(), expire, isActive:true, visitCount:0}

    const link = await Dynamo.write(newLink, process.env.LINKS_TABLE)
    console.log('link', link)
    const shortLink = `${process.env.HOST_URL}/${link.id}`;

    //set invocation time
    const time = new Date(new Date().getTime()).toISOString();

    const schedule = await scheduleDeactivation(link.id, time, {id:link.id});
    console.log(schedule)

    return Responses._200({ shortLink })
};


