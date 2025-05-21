import { connect, disconnect, Types } from "mongoose"
import { User, Post } from "./models.js"

export const data = {
    users: User, posts: Post,
    ObjectId: Types.ObjectId,
    connect: (url, dbName) => {
        return connect(`${url}/${dbName}`)
            .catch(error => console.error(error))
            .then(() => {
                console.info(`Connected to Mongo Server ${url}/${dbName}`)
            })
    },
    disconnect: () => {
        return disconnect()
            .then(console.info('db disconected'))
            .catch(error => console.error(error))
    }
}