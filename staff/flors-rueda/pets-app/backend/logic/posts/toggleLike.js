import { errors } from "common"
import { data } from "../../data/index.js"

const toggleLike = (postId, userId) => {

    return data.users.findById(userId)
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) { throw new errors.ExistenceError('user not found') }
            return data.posts.findById(postId)
                .catch(error => { throw new errors.ServerError(error.message) })
                .then((post) => {
                    if (!post) { throw new errors.ExistenceError('post not found') }
                    const updatedLikesArray = post.likes
                    const userIndex = updatedLikesArray.indexOf(user._id)
                    if (userIndex !== -1) {
                        updatedLikesArray.splice(userIndex, 1);
                    } else {
                        updatedLikesArray.push(user._id)
                    }
                    return data.posts.findByIdAndUpdate(postId, { $set: { likes: updatedLikesArray } })
                })
        })
}

export default toggleLike