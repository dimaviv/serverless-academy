import {APIResponse, Responses} from "../common/API_Responses";
import {deleteSchedule} from "@libs/task-scheduler";
import {deactivateLinkById, queueDeactivationNotification} from "../links/deactivateLink";
import {Link} from "../common/types/link.type";



export const scheduleDeactivateLink = async (event): Promise<APIResponse> => {
    console.log(event);
    const { id } = event;

    const deactivatedLink: Link = await deactivateLinkById(id);

    await deleteSchedule(`deactivate_${id}`);

    const notificationQueue = await queueDeactivationNotification(deactivatedLink);
    console.log(notificationQueue);

    return Responses._200({ success: true, updatedLink: deactivatedLink });
};