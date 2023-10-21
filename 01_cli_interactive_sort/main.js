const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const inputValues = async () => {
    return new Promise((resolve, reject) => {
        rl.question('Please, enter 10 words or numbers, separated by spaces  ', (input) => {
            resolve(input.split(' '));
        });
    });
};

const inputSortType = async () => {
    return new Promise((resolve, reject) => {
        rl.question('\nHow would you like to sort values? \n' +
            '1. Sort words alphabetically\n' +
            '2. Show numbers from lesser to greater\n' +
            '3. Show numbers from bigger to smaller\n' +
            '4. Display words in ascending order by number of letters in the word\n' +
            '5. Show only unique words\n' +
            '6. Display only unique values from the set of words and numbers entered by the user\n' +
            'Select (1 - 6) and press ENTER: ', (input) => {
            resolve(input);
        });
    });
};

const validateInput = (arr) => {
    const regex = /^-?\d+$|^[a-zA-Z]+$/;
    for (let item of arr) {
        if (!regex.test(item)) {
            return false;
        }
    }
    return true;
}


// Sorting functions for sort()
const sortWordsAlphabetically = (a, b) => {
    return a.localeCompare(b);
};

const sortNumbersAsc = (a, b) => {
    return a - b;
};

const sortNumbersDesc = (a, b) => {
    return b - a;
};

const sortWordsLengthAsc = (a, b) => {
    return a.length - b.length;
};



// Filtering Functions
const filterWords = (item) => {
    return !isNaN(item);
};

const filterNumbers = (item) => {
    return isNaN(item);
};


const uniqueWords = (input) => {
    const words = input.filter(filterNumbers)
    const set = new Set(words)

    return Array.from(set)
}

 // Based on my limited experience of solving codewars problems, using Set is quite efficient approach
const uniqueValues = (input) => {
    const set = new Set(input)
    return Array.from(set)
}

const filterAndSortArray = (sortFunc, filterFunc) => {
    return (input) => {
        return input.filter(filterFunc).sort(sortFunc);
    };
};

(async () => {
    try {
        mainLoop:
        while (true){
            const inputArray = await inputValues()
            if (inputArray.length !== 10) throw new Error("Incorrect values amount")
            if (!validateInput(inputArray)) throw new Error("Invalid value! Value must be word or number.")

            let convertingFunc;
            switch (await inputSortType()) {
                case "1":
                    convertingFunc = filterAndSortArray(sortWordsAlphabetically, filterNumbers)
                    break;
                case "2":
                    convertingFunc = filterAndSortArray(sortNumbersAsc, filterWords)
                    break;
                case "3":
                    convertingFunc = filterAndSortArray(sortNumbersDesc, filterWords)
                    break;
                case "4":
                    convertingFunc = filterAndSortArray(sortWordsLengthAsc, filterNumbers)
                    break;
                case "5":
                    convertingFunc = uniqueWords
                    break;
                case "6":
                    convertingFunc = uniqueValues
                    break;
                case "":
                    continue;
                case 'exit':
                    console.log("Goodbye! Thank you for using our app!")
                    break mainLoop;
            }

            const convertedArray = convertingFunc(inputArray)

            console.log(convertedArray)
            console.log('\n')
        }

    } catch (error) {
        console.error(error.message);
    } finally {
        rl.close();
    }
})();

