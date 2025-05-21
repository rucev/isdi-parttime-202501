import express from 'express';
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routes/users/index.js';
import postRouter from './routes/posts/index.js';
import { data } from './data/index.js';
import 'dotenv/config'

const port = process.env.PORT
const url = process.env.MONGO_URL
const dbName = process.env.MONGO_DB


try {
    data.connect(url, dbName).catch(error => console.error(error))
        .then(() => {

            const api = express()

            api.use(cors())


            api.get('/api', (req, res) => {
                res.status(200)
                res.send('Hello World!')
            })

            api.use('/users', userRouter)
            api.use('/posts', postRouter)

            api.use(errorHandler)

            api.listen(port, () => {
                console.info(`API listening to PORT: ${port}`)
            })
        })
} catch (error) {
    console.error(error)
}
