import express from 'express';
import e, { json } from 'express';
import { data } from './data/index.js';
import { errors, validators } from 'common';

const port = 4321 //localhost:4321/

const api = express()

const jsonBodyParser = json()

api.get('/api', (req, res) => {
    res.status(200)
    res.send('Hello World!')
})

api.post('/users', jsonBodyParser, (req, res) => {
    const { email, password } = req.body

    try {
        validators.email(email)
        validators.password(password)
        const username = email.split('@')[0]

        data.users.findUserByEmail(email, (error, user) => {
            if (error) res.status(500).send(error.message)
            else if (user) res.status(409).send('Duplicity error.')
            else {
                data.users.createUser({ email, password, username }, (error, user) => {
                    if (error) res.status(500).send(error.message)
                    else if (user) res.status(201).send()
                    else {
                        res.status(500).send('something went wrong')
                    }
                })
            }
        })
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    }
})

api.listen(port, () => {
    console.info(`API listening to PORT: ${port}`)
})