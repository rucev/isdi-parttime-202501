import { after, describe } from "mocha";
import { data } from "../../data/index.js";
import 'dotenv/config'
import getAvatar from "./getAvatar.js";
import { expect } from "chai"
import { errors } from "common";

describe('getAvatar', () => {
    before(() => {
        return data.connect(process.env.MONGO_URL, process.env.MONGO_DB_TEST)
    })

    after(() => {
        return data.disconnect()
    })

    afterEach(() => {
        return data.users.deleteMany()
    })

    it('GIVEN two ids that exist in the DB WHEN called getAvatar on a user that has an avatar THEN returns the goal id user´s avatar', () => {
        const user1data = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [], avatar: 'www.iam.com/animage.png' }
        const user2data = { username: 'Test-2', password: 'Test2!', email: 'email2@mail.com', following: [], followers: [] }

        return data.users.create([user1data, user2data])
            .then(([user1, user2]) => {
                const userLoggedId = user2._id.toString()
                const userGoalId = user1._id.toString()

                return getAvatar(userLoggedId, userGoalId)
                    .then((avatar) => {
                        expect(avatar).to.be.a('string')
                        expect(avatar).to.be.equal(user1data.avatar)
                    })
            })
    })

    it('GIVEN two ids that exist in the DB WHEN called getAvatar on a user that does not have an avatar THEN returns undefined', () => {
        const user1data = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [], avatar: 'www.iam.com/animage.png' }
        const user2data = { username: 'Test-2', password: 'Test2!', email: 'email2@mail.com', following: [], followers: [] }

        return data.users.create([user1data, user2data])
            .then(([user1, user2]) => {
                const userLoggedId = user1._id.toString()
                const userGoalId = user2._id.toString()

                return getAvatar(userLoggedId, userGoalId)
                    .then((avatar) => {
                        expect(avatar).to.be.a('undefined')
                        expect(avatar).to.be.equal(undefined)
                    })
            })
    })

    it('GIVEN only logged id that exist in the DB WHEN called getAvatar on a goal id that does not exists THEN throws ExistenceError', () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }

        return data.users.create(userData)
            .then(createdUser => {
                const userId = createdUser._id.toString()
                const randomId = new data.ObjectId()

                return getAvatar(userId, randomId.toString())
                    .catch(error => {
                        expect(error).to.be.instanceOf(errors.ExistenceError)
                        expect(error.message).to.be.a('string')
                        expect(error.message).to.be.equal('user not found')
                    })
            })
    })

    it('GIVEN only goal id that exist in the DB WHEN called getAvatar on a logged id that does not exists THEN throws ExistenceError', () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }

        return data.users.create(userData)
            .then(createdUser => {
                const userId = createdUser._id.toString()
                const randomId = new data.ObjectId()

                return getAvatar(randomId.toString(), userId)
                    .catch(error => {
                        expect(error).to.be.instanceOf(errors.ExistenceError)
                        expect(error.message).to.be.a('string')
                        expect(error.message).to.be.equal('logged user not found')
                    })
            })
    })
})