import { errors } from "common"
import { data } from "../../data/index.js"

const getAllPosts = (userId) => {
    return data.users.findById(userId)
        .catch((error) => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) { throw new errors.ExistenceError('user not found') }
            return data.posts.find({}).populate('author', 'username _id avatar').sort({ createdAt: -1 }).lean()
                .catch((error) => { throw new errors.ServerError(error.message) })
                .then(posts => {
                    const formatedPosts = posts.map((post) => {
                        post.id = post._id.toString()
                        delete post._id

                        post.author.id = post.author._id.toString()
                        delete post.author._id

                        const date = post.createdOn ? new Date(post.createdOn) : new Date(post.createdAt)
                        delete post.createdAt
                        post.createdOn = date.toLocaleString()

                        if (post.likes.length > 0 && (post.likes.filter(objectId => objectId.toString() === userId)).length !== 0) {
                            post.isLiked = true
                        } else {
                            post.isLiked = false
                        }
                        return post
                    })
                    return formatedPosts
                })
        })
}

export default getAllPosts