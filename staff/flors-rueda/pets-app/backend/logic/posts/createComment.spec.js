import { describe } from "mocha"
import { data } from "../../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import createComment from "./createComment.js"

describe('createComment', () => {
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

    it('GIVEN an existent user and an existent WHEN createComment is called find the post THEN updates the post document pushing the comment to the comments array', async () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
        const user = await data.users.create(userData)

        const postData = { author: user._id, likes: [user._id], title: 'post-1-test', description: 'post-1-content-test', img: 'this.link/image.png' }
        const post = await data.posts.create(postData)

        await createComment(user._id.toString(), post._id.toString(), 'this is a comment :D')

        const updatedPost = await data.posts.findById(post._id)
        expect(updatedPost.comments).to.be.an('array')
        expect(updatedPost.comments.length).to.be.equal(1)
        expect(updatedPost.comments[0].content).to.be.equal('this is a comment :D')
        expect(updatedPost.comments[0].author.toString()).to.be.equal(user._id.toString())
        expect(updatedPost.comments[0].createdAt).to.exist
    })

    it('GIVEN a non existent user id WHEN createComment is called it does not find the user THEN throws an ExistenceError', async () => {
        const fakeId = new data.ObjectId()

        try {
            await createComment(fakeId, fakeId, 'test')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.be.a('string')
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN an existent user id and a non existent post id WHEN createComment is called it does not find the post THEN throws an ExistenceError', async () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
        const user = await data.users.create(userData)

        const fakeId = new data.ObjectId()

        try {
            await createComment(user._id.toString(), fakeId, 'test')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.be.a('string')
            expect(error.message).to.equal('post not found')
        }
    })
})