import { APIGatewayProxyEvent } from 'aws-lambda';
import {customAlphabet } from 'nanoid'
import {Dynamo} from "../common/Dynamo";
import {verifyToken} from "../common/utils/jwt-utils";
import {scheduleDeactivation} from "@libs/task-scheduler";
import {APIResponse, Responses} from "../common/API_Responses";
import {allowedExpireTimeInMinutes} from "../common/constants";
import {Link} from "../common/types/link.type";
import {DecodedToken} from "../common/types/decoded-token.type";
import ApiError from "../common/ApiError";



enum ExpireOptions {
    Once = 'once',
    OneDay = '1d',
    ThreeDays = '3d',
    SevenDays = '7d',
}

export const shortenLink = async (event: APIGatewayProxyEvent): Promise<APIResponse> => {
    try {
        const { url, expire }: { url: string; expire?: ExpireOptions } = JSON.parse(event.body as string);
        const user: DecodedToken = await verifyToken(event.headers.Authorization.split(' ')[1]);

        const id: string = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();

        let expireAt: string | null = null;
        if (expire && expire !== ExpireOptions.Once) {
            const min: number = allowedExpireTimeInMinutes[expire];
            expireAt = new Date(new Date().getTime() + min * 60000).toISOString();
        }

        const newLink: Link = { id, url, userId: user.sub, createdAt: new Date().toISOString(), expire, expireAt, isActive: true, visitCount: 0 };

        const link: Link = await Dynamo.write(newLink, process.env.LINKS_TABLE);
        console.log('link', link);
        const shortLink: string = `${process.env.HOST_URL}/${link.id}`;

        if (expireAt) {
            const schedule = await scheduleDeactivation(link.id, expireAt, { id: link.id });
            console.log(schedule);
        }

        return Responses._200({ shortLink });

    }catch (e) {
        if (e instanceof ApiError){
            return Responses.error(e.status, e.message)
        }
        return Responses._500({ message: 'Internal Server Error' });
    }
};


