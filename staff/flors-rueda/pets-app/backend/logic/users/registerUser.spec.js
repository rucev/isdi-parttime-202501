import { after, describe } from "mocha"
import { data } from "../../data/index.js"
import 'dotenv/config'
import registerUser from "./registerUser.js"
import { expect } from "chai"
import { errors } from "common"
import bcrypt from "bcrypt"

describe('registerUser', () => {
    before(() => {
        return data.connect(process.env.MONGO_URL, process.env.MONGO_DB_TEST)
    })

    after(() => {
        return data.disconnect()
    })

    afterEach(() => {
        return data.users.deleteMany()
    })

    it('GIVEN valid data and not present in the DB WHEN called registerUser THEN adds the user to the DB', () => {
        return registerUser('test1@mail.com', '12345Aa!', 'test1')
            .then(() => {
                return data.users.find({})
                    .then((users) => {
                        const user = users[0]

                        return bcrypt.compare('12345Aa!', user.password)
                            .then(result => {
                                expect(user).to.not.be.empty
                                expect(user.email).to.equal('test1@mail.com')
                                expect(result).to.be.true
                                expect(user.username).to.equal('test1')
                                expect(user._id).to.exist
                            })
                    })
            })
    })

    it('GIVEN valid data but already used in a user in the DB WHEN called registerUser THEN throws DuplicityError', () => {
        const password = '12345Aa!'
        const email = 'test@mail.com'
        const username = 'test'

        return bcrypt.hash(password, 5)
            .then(hashPassword => {
                return data.users.create({ username, password: hashPassword, email, followers: [], following: [] })
                    .then(() => {
                        return registerUser('test1@mail.com', '12345Aa!', 'test1')
                            .catch(error => {
                                expect(error).to.be.instanceOf(errors.DuplicityError)
                                expect(error.message).to.be.a('string')
                                expect(error.message).to.be.equal('user already exists')
                            })
                    })
            })
    })
})