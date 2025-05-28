import { errors } from "common"
import { data } from "../../data/index.js"

const getPostsByAuthor = (userId, authorId) => {
    return data.users.findById(userId)
        .catch((error) => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) { throw new errors.ExistenceError('user not found') }
            return data.users.findById(authorId)
                .catch((error) => { throw new errors.ServerError(error.message) })
                .then((_author) => {
                    if (!_author) { throw new errors.ExistenceError('author not found') }
                    return data.posts.find({ author: _author._id }).populate('author', 'username _id avatar').populate('comments.author', 'username _id avatar').sort({ createdAt: -1 }).lean()
                        .catch((error) => { throw new errors.ServerError(error.message) })
                        .then(posts => {
                            const formatedPosts = posts.map((post) => {
                                post.id = post._id.toString()
                                delete post._id

                                if (post.author._id && !post.author.id) {
                                    post.author.id = post.author._id.toString()
                                    delete post.author._id
                                }

                                post.comments = post.comments.length > 0 ? post.comments.map(comment => {
                                    comment.id = comment._id.toString()
                                    delete comment._id

                                    if (comment.author && !comment.author.id) {
                                        comment.author.id = comment.author._id.toString()
                                        delete comment.author._id
                                    }

                                    const date = new Date(comment.createdAt)
                                    comment.createdAt = date.toLocaleString()

                                    return comment

                                }) : []

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
        })
}

export default getPostsByAuthor