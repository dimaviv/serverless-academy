import inquirer from 'inquirer';
import db from "./database.js";


const namePrompt = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the user\'s name. Press ENTER to cancel: ',
        validate: function (value) {
            if (value.length || value === '') {
                return true;
            } else {
                return 'Please enter your name.';
            }
        }
    }
];

const userDetailsQuestions = [
    {
        type: 'list',
        name: 'gender',
        message: 'Choose the gender: ',
        choices: ['male', 'female'],
    },
    {
        type: 'input',
        name: 'age',
        message: 'Enter the age: ',
        validate: function(value) {
            const age = parseInt(value);
            const valid = !isNaN(age);
            if (valid && age >= 0 && age < 150) {
                return true;
            } else {
                return 'Please enter a valid age between 0 and 150.';
            }
        }
    }
]

const confirmSearchPrompt = [
    {
        type: 'confirm',
        name: 'wantToSearch',
        message: 'Would you like to search values in DB? ',
    },
]

const searchPrompt = [
    {
        type: 'input',
        name: 'searchName',
        message: 'Enter the user\'s name you want to find in DB: ',
        validate: function (value) {
            if (value.length || value === '') {
                return true;
            } else {
                return 'Please enter the correct name.';
            }
        }
    }
];

const convertCapslock = (inputString) => {
    if (inputString === inputString.toUpperCase()) {
        const lowerCaseString = inputString.toLowerCase();
        const convertedString = lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
        return convertedString;
    } else {
        return inputString;
    }
}

const ask = async () => {
    try {
        const nameAnswer = await inquirer.prompt(namePrompt);

        if (nameAnswer.name === '') {
            const confirmAnswer = await inquirer.prompt(confirmSearchPrompt);
            if (confirmAnswer.wantToSearch) {
                console.log(await db.findAllUsers());
                const {searchName} = await inquirer.prompt(searchPrompt);
                console.log(await db.findUser( convertCapslock(searchName)));
            }
            await db.dropDatabase()
            return;
        }
        const detailsAnswers = await inquirer.prompt(userDetailsQuestions);
        await db.createUser({ ...nameAnswer, ...detailsAnswers });
        await ask();
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

await ask()
