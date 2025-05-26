import { describe } from "mocha"
import { data } from "../../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import deletePost from "./deletePost.js"

describe('deletePost', () => {
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

    it('GIVEN an existent user id that has published multiple post and references one by the id WHEN deletePost is called checks the author id THEN deletes the post referenced but not the other ones', () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }

        return data.users.create(userData)
            .then(user => {
                const post1Data = { author: user._id, likes: [user._id], title: 'post-1-test', description: 'post-1-content-test', img: 'this.link/image.png' }
                const post2Data = { author: user._id, likes: [user._id], title: 'post-2-test', description: 'post-2-content-test', img: 'this.link/image.png' }

                return data.posts.create([post1Data, post2Data])
                    .then(([post1, post2]) => {
                        return deletePost(post1._id.toString(), user._id.toString())
                            .then(() => {
                                data.posts.find({ author: user._id })
                                    .then((posts) => {
                                        expect(posts).to.be.an('array')
                                        should(posts.length).to.equal(1)
                                        assert(posts).to.not.be.empty

                                        expect(posts[0]._id.toString()).to.equal(post2._id.toString())
                                        expect(posts[0].title).to.equal(post2.title)
                                        expect(posts[0].description).to.equal(post2.description)
                                        expect(posts[0].img).to.equal(post2.img)
                                        expect(posts[0].likes).to.deep.equal(post2.likes)
                                    })
                            })
                    })
            })
    })

    it('GIVEN an existent user id that has published (only) the post referenced by the id WHEN deletePost is called checks the author id THEN deletes the post and the user has no more posts', () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }

        return data.users.create(userData)
            .then(user => {
                const post1Data = { author: user._id, likes: [user._id], title: 'post-1-test', description: 'post-1-content-test', img: 'this.link/image.png' }

                return data.posts.create(post1Data)
                    .then(post => {
                        return deletePost(post._id.toString(), user._id.toString())
                            .then(() => {
                                data.posts.find({ author: user._id })
                                    .then((posts) => {
                                        expect(posts).to.be.an('array')
                                        expect(posts.length).to.equal(0)
                                        expect(posts).to.be.empty
                                    })
                            })
                    })
            })
    })

    it('GIVEN a not existent user id WHEN deletePost is called does not found the user THEN throws User ExistenceError', () => {
        const fakeId = new data.ObjectId()
        return deletePost(fakeId.toString(), fakeId.toString())
            .catch(error => {
                expect(error).to.be.instanceOf(errors.ExistenceError)
                expect(error.message).to.be.a('string')
                expect(error.message).to.equal('user not found')
            })
    })

    it('GIVEN an existent user id and a not existent post id WHEN deletePost is called does not found the post THEN throws Post ExistenceError', () => {
        const user1Data = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
        const fakeId = new data.ObjectId()

        return data.users.create(user1Data)
            .then(user => {
                return deletePost(fakeId.toString(), user._id.toString())
                    .catch(error => {
                        expect(error).to.be.instanceOf(errors.ExistenceError)
                        expect(error.message).to.be.a('string')
                        expect(error.message).to.equal('post not found')
                    })
            })
    })

    it('GIVEN an existent user id and an existent post id (created by another user) WHEN deletePost is called checks the author id THEN throws AuthError', () => {
        const user1Data = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
        const user2Data = { username: 'Test-2', password: 'Test2!', email: 'email2@mail.com', following: [], followers: [], avatar: 'random.com/image.png' }

        return data.users.create([user1Data, user2Data])
            .then(([user1, user2]) => {
                const post1Data = { author: user2._id, likes: [user1._id], title: 'post-1-test', description: 'post-1-content-test', img: 'this.link/image.png' }

                return data.posts.create(post1Data)
                    .then(post => {
                        return deletePost(post._id.toString(), user1._id.toString())
                            .catch(error => {
                                expect(error).to.be.instanceOf(errors.AuthError)
                                expect(error.message).to.be.a('string')
                                expect(error.message).to.equal('no permissions to delete this post')
                            })
                    })
            })
    })
})