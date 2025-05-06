import { MongoClient, ObjectId } from "mongodb";

const url = 'mongodb://localhost:27017'
const dbName = 'pets-app'

export const data = {
    users: null, posts: null,
    ObjectId,
    connect: () => {
        const mongoClient = new MongoClient(url)

        return mongoClient.connect()
            .catch(error => console.error(error))
            .then(() => {
                const db = mongoClient.db(dbName)
                console.info(`Connected to Mongo Server ${url}/${dbName}`)

                data.users = db.collection('users')
                data.posts = db.collection('posts')
            })
    }
}