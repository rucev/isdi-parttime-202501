import { connect } from "mongoose"
import 'dotenv/config'
import { User, Post, ObjectId } from "./models.js"

const url = process.env.MONGO_URL
const dbName = process.env.MONGO_DB

export const data = {
    users: User, posts: Post,
    ObjectId,
    connect: () => {
        return connect(`${url}/${dbName}`)
            .catch(error => console.error(error))
            .then(() => {
                console.info(`Connected to Mongo Server ${url}/${dbName}`)
            })
    }
}