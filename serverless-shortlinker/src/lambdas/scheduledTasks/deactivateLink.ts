import {Responses} from "../common/API_Responses";
import {deleteSchedule} from "@libs/task-scheduler";
import {deactivateLinkById} from "@functions/deactivateLink";



export const scheduleDeactivateLink = async (event) => {
    console.log(event)
    const { id } = event;

    console.log("id", id)
    const deactivatedLink = await deactivateLinkById(id)

    // const link = await Dynamo.getById(id, process.env.LINKS_TABLE)
    // const updatedLink = { ...link, isActive: false };
    // console.log(updatedLink)
    // const deactivatedLink = await Dynamo.putById(updatedLink, process.env.LINKS_TABLE)

    await deleteSchedule(`deactivate_${id}`)

    return Responses._200({ success:!!deactivatedLink, updatedLink: deactivatedLink })
};