import { errors } from "common"
import { data } from "../../data/index.js"

const createComment = async (userId, postId, commentContent) => {
    const user = await data.users.findById(userId)
    if (!user) throw new errors.ExistenceError('user not found')

    const post = await data.posts.findById(postId)
    if (!post) throw new errors.ExistenceError('post not found')

    post.comments.push({ author: user._id, content: commentContent })

    await post.save()
}

export default createComment