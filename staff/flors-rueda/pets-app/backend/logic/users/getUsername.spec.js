import { after, describe } from "mocha";
import { data } from "../../data/index.js";
import 'dotenv/config'
import getUsername from "./getUsername.js";
import { expect } from "chai"
import { errors } from "common";

describe('getUsername', () => {
    before(() => {
        return data.connect(process.env.MONGO_URL, process.env.MONGO_DB_TEST)
    })

    after(() => {
        return data.disconnect()
    })

    afterEach(() => {
        return data.users.deleteMany()
    })

    it('GIVEN two ids that exist in the DB WHEN called getUsername on a user that has an username THEN returns the goal id user´s username', () => {
        const user1data = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
        const user2data = { username: 'Test-2', password: 'Test2!', email: 'email2@mail.com', following: [], followers: [] }

        return data.users.create([user1data, user2data])
            .then(([user1, user2]) => {
                const userLoggedId = user2._id.toString()
                const userGoalId = user1._id.toString()

                return getUsername(userLoggedId, userGoalId)
                    .then((username) => {
                        expect(username).to.be.a('string')
                        expect(username).to.be.equal(user1data.username)
                    })
            })
    })

    it('GIVEN only logged id that exist in the DB WHEN called getUsername on a goal id that does not exists THEN throws ExistenceError', () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }

        return data.users.create(userData)
            .then(createdUser => {
                const userId = createdUser._id.toString()
                const randomId = new data.ObjectId()

                return getUsername(userId, randomId.toString())
                    .catch(error => {
                        expect(error).to.be.instanceOf(errors.ExistenceError)
                        expect(error.message).to.be.a('string')
                        expect(error.message).to.be.equal('user not found')
                    })
            })
    })

    it('GIVEN only goal id that exist in the DB WHEN called getUsername on a logged id that does not exists THEN throws ExistenceError', () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }

        return data.users.create(userData)
            .then(createdUser => {
                const userId = createdUser._id.toString()
                const randomId = new data.ObjectId()

                return getUsername(randomId.toString(), userId)
                    .catch(error => {
                        expect(error).to.be.instanceOf(errors.ExistenceError)
                        expect(error.message).to.be.a('string')
                        expect(error.message).to.be.equal('logged user not found')
                    })
            })
    })
})