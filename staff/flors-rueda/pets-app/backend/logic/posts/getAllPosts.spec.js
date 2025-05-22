import { describe } from "mocha"
import { data } from "../../data/index.js"
import getAllPosts from "./getAllPosts.js"
import { expect } from "chai"
import { errors } from "common"


describe('getAllPosts', () => {
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

    it('GIVEN an existent user with multiple posts published WHEN getAllPosts is called it populates the post info THEN returns a populated and formated posts array', () => {
        const user1Data = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
        const user2Data = { username: 'Test-2', password: 'Test2!', email: 'email2@mail.com', following: [], followers: [], avatar: 'random.com/image.png' }
        const user3Data = { username: 'Test-3', password: 'Test3!', email: 'email3@mail.com', following: [], followers: [] }

        return data.users.create([user1Data, user2Data, user3Data])
            .then(([user1, user2, user3]) => {
                const post1Data = { author: user2._id, likes: [user1._id], title: 'post-1-test', description: 'post-1-content-test', img: 'this.link/image.png' }
                const post2Data = { author: user3._id, likes: [user2._id], title: 'post-2-test', description: 'post-2-content-test' }
                return data.posts.create(post1Data)
                    .then((post1) => {
                        return data.posts.create(post2Data)
                            .then(post2 => {
                                return getAllPosts(user1._id.toString())
                                    .then(posts => {
                                        expect(posts).to.be.an('array')
                                        expect(posts.length).to.equal(2)

                                        expect(posts[0].id).to.equal(post2._id.toString())
                                        expect(posts[0]._id).to.equal(undefined)
                                        expect(posts[0].likes).to.deep.equal(post2Data.likes)
                                        expect(posts[0].title).to.equal(post2Data.title)
                                        expect(posts[0].description).to.equal(post2Data.description)
                                        expect(posts[0].img).to.equal(post2Data.img)
                                        expect(posts[0].createdAt).to.not.exist
                                        expect(posts[0].createdOn).to.exist
                                        expect(posts[0].isLiked).to.be.false
                                        expect(posts[0].author).to.be.an('object')
                                        expect(posts[0].author.username).to.equal(user3.username)
                                        expect(posts[0].author.avatar).to.equal(user3.avatar)
                                        expect(posts[0].author.id).to.equal(user3._id.toString())
                                        expect(posts[0].author.password).to.equal(undefined)
                                        expect(posts[0].author.mail).to.equal(undefined)
                                        expect(posts[0].author._id).to.equal(undefined)
                                        expect(posts[0].author.followers).to.equal(undefined)
                                        expect(posts[0].author.follows).to.equal(undefined)

                                        expect(posts[1].id).to.equal(post1._id.toString())
                                        expect(posts[1]._id).to.equal(undefined)
                                        expect(posts[1].likes).to.deep.equal(post1Data.likes)
                                        expect(posts[1].title).to.equal(post1Data.title)
                                        expect(posts[1].description).to.equal(post1Data.description)
                                        expect(posts[1].img).to.equal(post1Data.img)
                                        expect(posts[1].createdAt).to.not.exist
                                        expect(posts[1].createdOn).to.exist
                                        expect(posts[1].isLiked).to.be.true
                                        expect(posts[1].author).to.be.an('object')
                                        expect(posts[1].author.username).to.equal(user2.username)
                                        expect(posts[1].author.avatar).to.equal(user2.avatar)
                                        expect(posts[1].author.id).to.equal(user2._id.toString())
                                        expect(posts[1].author.password).to.equal(undefined)
                                        expect(posts[1].author.mail).to.equal(undefined)
                                        expect(posts[1].author._id).to.equal(undefined)
                                        expect(posts[1].author.followers).to.equal(undefined)
                                        expect(posts[1].author.follows).to.equal(undefined)
                                    })
                            })

                    })
            })
    })

    it('GIVEN an existent user id and no posts published WHEN getAllPosts is called THEN returns an empty array', () => {
        const userData = { username: 'Test-1', password: 'Test1!', email: 'email@mail.com', following: [], followers: [] }
        return data.users.create(userData)
            .then(user => {
                return getAllPosts(user._id.toString())
                    .then(posts => {
                        expect(posts).to.be.an('array')
                        expect(posts.length).to.equal(0)
                    })
            })
    })

    it('GIVEN a not existent user id WHEN getAllPosts is called does not found the user THEN thorws ExistenceError', () => {
        const fakeId = new data.ObjectId()
        return getAllPosts(fakeId.toString())
            .catch(error => {
                expect(error).to.be.instanceOf(errors.ExistenceError)
                expect(error.message).to.be.a('string')
                expect(error.message).to.equal('user not found')
            })
    })



})