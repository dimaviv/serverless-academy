import {SchedulerClient, CreateScheduleCommand, FlexibleTimeWindowMode, DeleteScheduleCommand } from "@aws-sdk/client-scheduler";


const client = new SchedulerClient();



export const scheduleDeactivation = async (name, time, payload) => {
    console.log(name, time, payload)
    time = time.slice(0, -5);
    console.log(time)
    console.log('Timezone: ',Intl.DateTimeFormat().resolvedOptions().timeZone)
    const input = {
        Name: `deactivate_${name}`,
        ScheduleExpression: `at(${time})`,
        ScheduleExpressionTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        Target: {
            Arn: `arn:aws:lambda:${process.env.AWS_REGION}:231892135743:function:serverless-shortlinker-dev-scheduledDeactivateLink`,
            RoleArn: `arn:aws:iam::231892135743:role/events`,
            Input: JSON.stringify(payload),
        },
        FlexibleTimeWindow: {
            Mode: FlexibleTimeWindowMode.OFF
        },
    };

    const command = new CreateScheduleCommand(input);

    return await client.send(command);
}

export const deleteSchedule = async (name) => {
    const input = {
        Name: name,
    };
    const command = new DeleteScheduleCommand(input);

    return await client.send(command);
}
