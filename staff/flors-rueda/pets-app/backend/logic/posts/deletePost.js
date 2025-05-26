import { errors } from "common"
import { data } from "../../data/index.js"

const deletePost = (postId, userId) => {
    return data.users.findById(userId)
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) { throw new errors.ExistenceError('user not found') }
            return data.posts.findById(postId)
                .catch(error => { throw new errors.ServerError(error.message) })
                .then(post => {
                    if (!post) { throw new errors.ExistenceError('post not found') }
                    if (userId !== post.author.toString()) { throw new errors.AuthError('no permissions to delete this post') }

                    return data.posts.findByIdAndDelete(postId)
                        .catch(error => { throw new errors.ServerError(error.message) })
                })
        })
}

export default deletePost