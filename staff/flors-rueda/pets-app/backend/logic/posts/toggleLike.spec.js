import { describe } from "mocha"
import { data } from "../../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import toggleLike from "./toggleLike.js"

describe('toggleLike', () => {
    before(() => {
        return data.connect(process.env.MONGO_URL, process.env.MONGO_DB_TEST)
    })

    after(() => {
        return data.disconnect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN an existent user and an existent post WHEN toggleLike is called and the post was not liked before THEN updates the likes array and pushes the user id', async () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
        const user = await data.users.create(userData)

        const postData = { author: user._id, likes: [], title: 'post-test', description: 'post-content-test', img: 'this.link/image.png' }

        const post = await data.posts.create(postData)

        await toggleLike(post._id.toString(), user._id.toString())

        const updatedPost = await data.posts.findById(post._id)

        expect(updatedPost.likes).to.be.an('array')
        expect(updatedPost.likes.length).to.equal(1)
        expect(updatedPost.likes[0].toString()).to.equal(user._id.toString())
    })

    it('GIVEN an existent user and an existent post WHEN toggleLike is called and the post was liked before THEN updates the likes array and deletes the user id', async () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
        const user = await data.users.create(userData)

        const postData = { author: user._id, likes: [user._id], title: 'post-test', description: 'post-content-test', img: 'this.link/image.png' }

        const post = await data.posts.create(postData)

        await toggleLike(post._id.toString(), user._id.toString())

        const updatedPost = await data.posts.findById(post._id)

        expect(updatedPost.likes).to.be.an('array')
        expect(updatedPost.likes.length).to.equal(0)
        expect(updatedPost.likes).to.be.empty
    })

    it('GIVEN a non existent user id WHEN toggleLike is called it does not find the user THEN throws ExistenceError', async () => {
        try {
            const fakeId = new data.ObjectId()
            await toggleLike(fakeId, fakeId)
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.be.a('string')
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN an existent user id but non existent post id WHEN toggleLike is called it does not find the post THEN throws ExistenceError', async () => {
        try {
            const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
            const user = await data.users.create(userData)
            const fakeId = new data.ObjectId()
            await toggleLike(fakeId, user._id.toString())
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.be.a('string')
            expect(error.message).to.equal('post not found')
        }
    })
})