import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import { APP_PORT } from "./config.env.js";


const PORT = APP_PORT || 5000

const app = express()


app.use(cors())
app.use(express.json())

app.use('', router)



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