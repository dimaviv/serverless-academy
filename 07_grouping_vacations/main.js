import fs from 'fs/promises'

const readJSONFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading the file:', err);
        return null;
    }
};

const formatVacationsJSON = async (unformattedVacations) => {
    const userIds = Array.from(new Set(unformattedVacations.map(vac => vac.user._id)))

    const formattedVacations = []

    for (const userId of userIds){
        const currentUserVacations = unformattedVacations.filter(vac => vac.user._id === userId)
        const userName = currentUserVacations[0].user.name

        let vacations = currentUserVacations.map(vac => {
            return {startDate: vac.startDate, endDate: vac.endDate}
        })
        vacations.sort((a, b) => a.startDate <= b.startDate ? 1: -1 )

        formattedVacations.push({
            userId,
            userName,
            vacations
        })
    }
    return formattedVacations;
}

const unformattedVacations = await readJSONFile('data.json')

const formattedVacations = await formatVacationsJSON(unformattedVacations)

console.log(formattedVacations)

