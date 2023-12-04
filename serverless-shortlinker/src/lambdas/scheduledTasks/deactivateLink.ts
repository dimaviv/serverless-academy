import {Responses} from "../common/API_Responses";
import {deleteSchedule} from "@libs/task-scheduler";
import {deactivateLinkById, queueDeactivationNotification} from "../links/deactivateLink";



export const scheduleDeactivateLink = async (event) => {
    console.log(event)
    const { id } = event;

    const deactivatedLink = await deactivateLinkById(id)

    await deleteSchedule(`deactivate_${id}`)

    const notificationQueue = await queueDeactivationNotification(deactivatedLink)
    console.log(notificationQueue)
    return Responses._200({ success:!!deactivatedLink, updatedLink: deactivatedLink })
};