import {STORAGE_TYPE} from "./config.env.js";

let storageRepository;
if (STORAGE_TYPE === 'dynamodb') {
    storageRepository = await import("./dynamoDbRepository.js");
    console.log('Storage: DynamoDB')
} else {
    storageRepository = await import("./fileSystemRepository.js");
    console.log('Storage: File System')
}
storageRepository = storageRepository.default


class StorageService {

    constructor(storageRepository) {
        this.storageRepository = storageRepository;
    }

    async saveJson(key, json) {
        return this.storageRepository.saveJson(key, json);
    }

    async readJson(key) {
        return this.storageRepository.readJson(key)
    }
}



export default new StorageService(storageRepository);