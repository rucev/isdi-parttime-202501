import { describe } from "mocha"
import { data } from "../../data/index.js"
import "dotenv/config"
import bcrypt from "bcrypt"
import loginUser from "./loginUser.js"
import { expect } from "chai"
import { errors } from "common"

describe('LoginUser', () => {
    before(() => {
        return data.connect(process.env.MONGO_URL, process.env.MONGO_DB_TEST)
    })

    after(() => {
        return data.disconnect()
    })

    afterEach(() => {
        return data.users.deleteMany()
    })


    it('GIVEN correct mail and password WHEN called login THEN returns user id passed to string', () => {
        const password = '12345Aa!'
        const email = 'test@mail.com'
        const username = 'test'

        return bcrypt.hash(password, 5)
            .then(hashPassword => {
                return data.users.create({ username, password: hashPassword, email, followers: [], following: [] })
                    .then(createdUser => {
                        return loginUser(email, password)
                            .then(id => {
                                expect(id).to.be.a('string')
                                expect(id).to.be.equal(createdUser._id.toString())
                            })
                    })
            })

    })

    it('GIVEN a mail that does not exist WHEN trying to login THEN throws ExistenceError', () => {
        return loginUser('notausermail@mail.com', 'notarealpassword')
            .catch(error => {
                expect(error).to.be.instanceOf(errors.ExistenceError)
                expect(error.message).to.be.a('string')
                expect(error.message).to.be.equal('user not found')
            })
    })

    it('GIVEN a valid mail but incorrect password WHEN trying to login THEN throws AuthError', () => {
        const password = '12345Aa!'
        const email = 'test@mail.com'
        const username = 'test'

        return bcrypt.hash(password, 5)
            .then(hashPassword => {
                return data.users.create({ username, password: hashPassword, email, followers: [], following: [] })
                    .then(_ => {
                        return loginUser(email, 'not-the-password')
                            .catch(error => {
                                expect(error).to.be.instanceOf(errors.AuthError)
                                expect(error.message).to.be.a('string')
                                expect(error.message).to.be.equal('invalid credentials')
                            })
                    })
            })
    })
})