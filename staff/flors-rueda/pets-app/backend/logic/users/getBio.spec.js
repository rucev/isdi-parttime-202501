import { after, describe } from "mocha";
import { data } from "../../data/index.js";
import 'dotenv/config'
import getBio from "./getBio.js";
import { expect } from "chai"
import { errors } from "common";

describe('getBio', () => {
    before(() => {
        return data.connect(process.env.MONGO_URL, process.env.MONGO_DB_TEST)
    })

    after(() => {
        return data.disconnect()
    })

    afterEach(() => {
        return data.users.deleteMany()
    })

    it('GIVEN two ids that exist in the DB WHEN called getBio on a user that has an bio THEN returns the goal id user´s bio', () => {
        const user1data = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [], bio: 'this is a bio' }
        const user2data = { username: 'Test-2', password: 'Test2!', email: 'email2@mail.com', following: [], followers: [] }

        return data.users.create([user1data, user2data])
            .then(([user1, user2]) => {
                const userLoggedId = user2._id.toString()
                const userGoalId = user1._id.toString()

                return getBio(userLoggedId, userGoalId)
                    .then((bio) => {
                        expect(bio).to.be.a('string')
                        expect(bio).to.be.equal(user1data.bio)
                    })
            })
    })

    it('GIVEN two ids that exist in the DB WHEN called getBio on a user that does not have an bio THEN returns undefined', () => {
        const user1data = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [], bio: 'this is a bio' }
        const user2data = { username: 'Test-2', password: 'Test2!', email: 'email2@mail.com', following: [], followers: [] }

        return data.users.create([user1data, user2data])
            .then(([user1, user2]) => {
                const userLoggedId = user1._id.toString()
                const userGoalId = user2._id.toString()

                return getBio(userLoggedId, userGoalId)
                    .then((bio) => {
                        expect(bio).to.be.a('undefined')
                        expect(bio).to.be.equal(undefined)
                    })
            })
    })

    it('GIVEN only logged id that exist in the DB WHEN called getBio on a goal id that does not exists THEN throws ExistenceError', () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }

        return data.users.create(userData)
            .then(createdUser => {
                const userId = createdUser._id.toString()
                const randomId = new data.ObjectId()

                return getBio(userId, randomId.toString())
                    .catch(error => {
                        expect(error).to.be.instanceOf(errors.ExistenceError)
                        expect(error.message).to.be.a('string')
                        expect(error.message).to.be.equal('user not found')
                    })
            })
    })

    it('GIVEN only goal id that exist in the DB WHEN called getBio on a logged id that does not exists THEN throws ExistenceError', () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }

        return data.users.create(userData)
            .then(createdUser => {
                const userId = createdUser._id.toString()
                const randomId = new data.ObjectId()

                return getBio(randomId.toString(), userId)
                    .catch(error => {
                        expect(error).to.be.instanceOf(errors.ExistenceError)
                        expect(error.message).to.be.a('string')
                        expect(error.message).to.be.equal('logged user not found')
                    })
            })
    })
})