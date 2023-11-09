import fs from 'fs/promises';


class FileSystemRepository {
    async saveJson(fileName, json) {
        try {
            const filePath = `data/${fileName}.json`;
            await fs.writeFile(filePath, JSON.stringify(json));
            return { success: true };
        } catch (e) {
            throw new Error("Error saving data");
        }
    };

    async readJson(fileName) {
        try {
            const filePath = `data/${fileName}.json`;
            const rawData = await fs.readFile(filePath);
            const data = JSON.parse(rawData);
            return { success: true , data};
        } catch (e) {
            throw new Error("Error reading data");
        }
    }
}

export default new FileSystemRepository();
