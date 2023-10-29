const unformattedVacations = [
    {
        "_id": "6196a33a3a853300128602eb",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e76",
            "name": "Laurence Knox"
        },
        "usedDays": 3,
        "startDate": "2021-11-19",
        "endDate": "2021-11-23"
    },
    {
        "_id": "61a3c3bb3a85330012864b5b",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e76",
            "name": "Laurence Knox"
        },
        "usedDays": 2,
        "startDate": "2021-12-09",
        "endDate": "2021-12-10"
    },
    {
        "_id": "61a3c3bb3a85330012864b5c",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e77",
            "name": "Eleanor Banks"
        },
        "usedDays": 5,
        "startDate": "2022-01-05",
        "endDate": "2022-01-10"
    },
    {
        "_id": "61a3c3bb3a85330012864b5d",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e77",
            "name": "Eleanor Banks"
        },
        "usedDays": 1,
        "startDate": "2022-02-14",
        "endDate": "2022-02-14"
    },
    {
        "_id": "61a3c3bb3a85330012864b5e",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e78",
            "name": "Matthew Robbins"
        },
        "usedDays": 4,
        "startDate": "2022-03-22",
        "endDate": "2022-03-25"
    },
    {
        "_id": "61a3c3bb3a85330012864b5f",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e78",
            "name": "Matthew Robbins"
        },
        "usedDays": 2,
        "startDate": "2022-04-17",
        "endDate": "2022-04-18"
    },
    {
        "_id": "6196a33a3a853300128602eb",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e76",
            "name": "Laurence Knox"
        },
        "usedDays": 3,
        "startDate": "2021-11-19",
        "endDate": "2021-11-23"
    },
    {
        "_id": "61a3c3bb3a85330012864b5b",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e76",
            "name": "Laurence Knox"
        },
        "usedDays": 2,
        "startDate": "2021-12-09",
        "endDate": "2021-12-10"
    },
    {
        "_id": "61a3c3bb3a85330012864b5c",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e77",
            "name": "Eleanor Banks"
        },
        "usedDays": 5,
        "startDate": "2022-01-05",
        "endDate": "2022-01-10"
    },
    {
        "_id": "61a3c3bb3a85330012864b5d",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e77",
            "name": "Eleanor Banks"
        },
        "usedDays": 1,
        "startDate": "2022-02-14",
        "endDate": "2022-02-14"
    },
    {
        "_id": "61a3c3bb3a85330012864b5e",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e78",
            "name": "Matthew Robbins"
        },
        "usedDays": 4,
        "startDate": "2022-03-22",
        "endDate": "2022-03-25"
    },
    {
        "_id": "61a3c3bb3a85330012864b5f",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e78",
            "name": "Matthew Robbins"
        },
        "usedDays": 2,
        "startDate": "2022-04-17",
        "endDate": "2022-04-18"
    },
    {
        "_id": "61a3c3bb3a85330012864b5g",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e79",
            "name": "Rebecca Marshall"
        },
        "usedDays": 3,
        "startDate": "2022-05-12",
        "endDate": "2022-05-14"
    },
    {
        "_id": "61a3c3bb3a85330012864b5h",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e79",
            "name": "Rebecca Marshall"
        },
        "usedDays": 1,
        "startDate": "2022-06-21",
        "endDate": "2022-06-21"
    },
    {
        "_id": "61a3c3bb3a85330012864b5i",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7a",
            "name": "Oliver Hayes"
        },
        "usedDays": 2,
        "startDate": "2022-07-18",
        "endDate": "2022-07-19"
    },
    {
        "_id": "61a3c3bb3a85330012864b5j",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7a",
            "name": "Oliver Hayes"
        },
        "usedDays": 3,
        "startDate": "2022-08-27",
        "endDate": "2022-08-29"
    },
    {
        "_id": "61a3c3bb3a85330012864b5k",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7b",
            "name": "Charlotte Phillips"
        },
        "usedDays": 4,
        "startDate": "2022-09-08",
        "endDate": "2022-09-11"
    },
    {
        "_id": "61a3c3bb3a85330012864b5l",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7b",
            "name": "Charlotte Phillips"
        },
        "usedDays": 1,
        "startDate": "2022-10-15",
        "endDate": "2022-10-15"
    },
    {
        "_id": "61a3c3bb3a85330012864b5m",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7c",
            "name": "Jacob Patel"
        },
        "usedDays": 2,
        "startDate": "2022-11-24",
        "endDate": "2022-11-25"
    },
    {
        "_id": "61a3c3bb3a85330012864b5n",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7c",
            "name": "Jacob Patel"
        },
        "usedDays": 3,
        "startDate": "2022-12-13",
        "endDate": "2022-12-15"
    },
    {
        "_id": "61a3c3bb3a85330012864b5o",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7d",
            "name": "Emily Reed"
        },
        "usedDays": 5,
        "startDate": "2023-01-02",
        "endDate": "2023-01-06"
    },
    {
        "_id": "61a3c3bb3a85330012864b5p",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7d",
            "name": "Emily Reed"
        },
        "usedDays": 2,
        "startDate": "2023-02-09",
        "endDate": "2023-02-10"
    },
    {
        "_id": "61a3c3bb3a85330012864b5q",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7e",
            "name": "Daniel Stewart"
        },
        "usedDays": 3,
        "startDate": "2023-03-17",
        "endDate": "2023-03-19"
    },
    {
        "_id": "61a3c3bb3a85330012864b5r",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7e",
            "name": "Daniel Stewart"
        },
        "usedDays": 1,
        "startDate": "2023-04-25",
        "endDate": "2023-04-25"
    },
    {
        "_id": "61a3c3bb3a85330012864b5s",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7f",
            "name": "Sophia Bell"
        },
        "usedDays": 4,
        "startDate": "2023-05-19",
        "endDate": "2023-05-22"
    },
    {
        "_id": "61a3c3bb3a85330012864b5t",
        "user": {
            "_id": "60b7c1f04df06a0011ef0e7f",
            "name": "Sophia Bell"
        },
        "usedDays": 2,
        "startDate": "2023-06-28",
        "endDate": "2023-06-29"
    }
]



const example = [
    {
        "userId":"60b7c1f04df06a0011ef0e76",
        "userName":"Laurence Knox",
        "vacations":[
            {
                "startDate":"2021-11-19",
                "endDate":"2021-11-23"
            },
            {
                "startDate":"2021-12-09",
                "endDate":"2021-12-10"
            }
        ]
    }
]

const startTime = new Date();

const userIds = Array.from(new Set(unformattedVacations.map(vac => vac.user._id)))
//const userIds = new Set(unformattedVacations.map(vac => vac.user._id))

const formattedVacations = []

for (const userId of userIds){
    const currentUserVacations = unformattedVacations.filter(vac => vac.user._id === userId)
    const userName = currentUserVacations[0].user.name

    const vacations = currentUserVacations.map(vac => {
        return {startDate: vac.startDate, endDate: vac.endDate}
    })

    formattedVacations.push({
        userId,
        userName,
        vacations
    })
}

console.log(formattedVacations)



const endTime = new Date();
const elapsedTime = endTime - startTime;
const elapsedTimeInSeconds = elapsedTime / 1000;

console.log(`Elapsed time: ${elapsedTimeInSeconds} seconds`);
// console.log(formattedVacations[0].vacations)
// console.log(formattedVacations[1].vacations)
// console.log(formattedVacations[2].vacations)