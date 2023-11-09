import express, { Router } from 'express';
import cors from 'cors';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import {APP_PORT} from "./config.env.js";
import storageController from "./storageController.js";


const PORT = APP_PORT || 5000

const app = express()


app.use(cors())
app.use(express.json())


const router = new Router();




router.put('/:json_path', storageController.putJson)
router.get('/:json_path', storageController.getJson)

app.use('/api', router)


// ErrorHandler, the last Middleware
app.use(errorHandler)


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()