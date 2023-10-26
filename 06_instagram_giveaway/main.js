import fs from 'fs';
import {FOLDER_WITH_FILES_PATH} from "./config.js";


const uniqueValues = (fileNames) => {
    let result = new Set();

    for (let file of fileNames) {
        const data = fs.readFileSync(file, 'utf8');
        const lines = data.trim().split('\n');

        for (let i = 0; i < lines.length; i++){
            result.add(lines[i])
        }
    }

    return result.size
}


const intersect = (a, b) => {
    return [...a].filter((x) => b.has(x));
};

const existInAllFiles = (fileNames) => {
    let result = []

    for (let file of fileNames) {
        const data = fs.readFileSync(file, 'utf8');
        const lines = data.trim().split('\n');
        const set = new Set(lines)

        if (result.length === 0) result = [...set]
        else result = intersect(result, set);
    }

    return result.length
}


const existInAtleastTen = (fileNames) => {

    // To prevent reassignment of built-in properties, such as .__proto__ or .toString
    // I use Object.create(null) instead of {};

    const valuesCount = Object.create(null);
    let count = 0;
    for (let file of fileNames) {
        const data = fs.readFileSync(file, 'utf8');
        const lines = data.trim().split('\n');
        let arr = Array.from(new Set(lines))

        for (let i = 0; i < arr.length; i++){
            let value = arr[i]
            valuesCount[value] = valuesCount[value] ? valuesCount[value] + 1 : 1;
            valuesCount[value] === 10 ? count++ : null
        }
    }

    return count;
}

const main = async() => {
    const startTime = new Date();

    const fileNames = []

    for (let i = 0; i < 20; i++) {
        fileNames.push(FOLDER_WITH_FILES_PATH +`out${i}.txt`)
    }


    const countUnique =  uniqueValues(fileNames)
    console.log('Unique:', countUnique)

    const countExistInAllFiles = existInAllFiles(fileNames)
    console.log('Exist in all files:', countExistInAllFiles)

    const countExistInAtleastTen = existInAtleastTen(fileNames)
    console.log('Exist in at least 10 files:', countExistInAtleastTen)


    const endTime = new Date();
    const elapsedTime = endTime - startTime;
    const elapsedTimeInSeconds = elapsedTime / 1000;

    console.log(`Elapsed time: ${elapsedTimeInSeconds} seconds`);

}
await main()


