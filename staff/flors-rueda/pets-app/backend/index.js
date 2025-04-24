import express from 'express';
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routes/users/index.js';


const port = 4321 //localhost:4321/

const api = express()

api.use(cors())


api.get('/api', (req, res) => {
    res.status(200)
    res.send('Hello World!')
})

api.use('/users', userRouter)

api.use(errorHandler)

api.listen(port, () => {
    console.info(`API listening to PORT: ${port}`)
})





/*


api.patch('/users/username', jsonBodyParser, (req, res) => {
    const authHeader = req.headers.authorization

    const id = Number(authHeader.split(' ')[1])

    const { username } = req.body

    try {
        validator.username(username)
        data.users.findUserById(id, (error, user) => {
            if (error) {
                res.status(500).send({ name: 'ServerError', message: error.message })
            } else {
                if (!user) res.status(404).send({ name: 'ExistenceError', message: 'user not found' })
                else {
                    user.username = username
                    data.users.updateUserById(id, user, (error, user) => {
                        if (error) {
                            res.status(500).send({ name: 'ServerError', message: error.message })
                        } else {
                            if (!user) res.status(500).send({ name: 'ServerError', message: error })
                            else {
                                res.status(200).send()
                            }
                        }
                    })
                }
            }
        })
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send({ name: error.name, message: error.message })
        } else {
            res.status(500).send({ name: 'ServerError', message: error.message })
        }
    }


})

api.get('/users/avatar', (req, res) => {
    const auhtHeader = req.headers.authorization

    const id = Number(auhtHeader.split(" ")[1])

    try {
        validator.id(id)
        data.users.findUserById(id, (error, user) => {
            if (error) res.status(500).send({ name: 'ServerError', message: error.message })
            else if (!user) res.status(404).send({ name: 'ExistenceError', message: 'user not found' })
            else res.status(200).send(user.avatar)
        })
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send({ name: error.name, message: error.message })
        } else {
            res.status(500).send({ name: 'ServerError', message: error.message })
        }
    }
})
*/