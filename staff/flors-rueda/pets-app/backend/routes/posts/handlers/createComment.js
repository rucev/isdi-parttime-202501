import { validator } from "common"
import logic from "../../../logic/index.js"

const createComment = async (req, res, next) => {
    const userId = req.userId
    const postId = req.params.postId
    const comment = req.body.comment

    try {
        validator.id(userId)
        validator.id(postId)

        await logic.createComment(userId, postId, comment)
        res.status(201).send()
    } catch (error) {
        next(error)
    }
}

export default createComment