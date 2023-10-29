const endpoints = [
    'https://jsonbase.com/sls-team/json-793',
    'https://jsonbase.com/sls-team/json-955',
    'https://jsonbase.com/sls-team/json-231',
    'https://jsonbase.com/sls-team/json-931',
    'https://jsonbase.com/sls-team/json-93',
    'https://jsonbase.com/sls-team/json-342',
    'https://jsonbase.com/sls-team/json-770',
    'https://jsonbase.com/sls-team/json-491',
    'https://jsonbase.com/sls-team/json-281',
    'https://jsonbase.com/sls-team/json-718',
    'https://jsonbase.com/sls-team/json-310',
    'https://jsonbase.com/sls-team/json-806',
    'https://jsonbase.com/sls-team/json-469',
    'https://jsonbase.com/sls-team/json-258',
    'https://jsonbase.com/sls-team/json-516',
    'https://jsonbase.com/sls-team/json-79',
    'https://jsonbase.com/sls-team/json-706',
    'https://jsonbase.com/sls-team/json-521',
    'https://jsonbase.com/sls-team/json-350',
    'https://jsonbase.com/sls-team/json-64'
];
//const data = {name:"asd", isDone:true}
// const data = {name:"asd", completion:{isDone:true}}
//const data = {name:"asd", tasks:[{name:'task1', isDone:false}]}
const data = {name:"asd", tasks:[{basic: [{name: 'task1', isDone: true}]}]}


const getIsDone = async (json) => {
    try {
        for (let key of Object.keys(json)) {

            if (typeof json[key] === 'object'){
                return await getIsDone(json[key])
            }

            if (key === 'isDone'){
                return json[key];
            }
        }
        return null;
    }catch (e) {
        return null;
    }
}


const checkCompletionFromAPIs = async (endpoints) => {
    try {
        for (const endpoint of endpoints){
            let res;
            for (let i = 0; i < 3; i++) {
                try {
                    res = await fetch(endpoint);
                    if (res) break;

                } catch (e) {}
            }
           // res = data
            const isDone = await getIsDone(res)
            const success = res ? 'Success' : 'Fail'
            let result = res ? `isDone - ${isDone}` : "The endpoint is unavailable"
            console.log(`[${success}] ${endpoint}: ${result}`)
        }
    }catch (e) {
        console.log(`error fetching data`)
    }
}

await checkCompletionFromAPIs(endpoints)


// const isDone = await getIsDone(data)
// console.log("isDone" + " -> " + isDone)