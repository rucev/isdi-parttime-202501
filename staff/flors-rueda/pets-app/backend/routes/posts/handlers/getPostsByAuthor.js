import { validator } from "common"
import logic from "../../../logic/index.js"

const getPostsByAuthor = (req, res, next) => {
    const userId = req.userId
    const { authorId } = req.params

    try {
        validator.id(userId)
        validator.id(authorId)

        logic.getPostsByAuthor(userId, authorId)
            .then(posts => {
                res.status(200).send(JSON.stringify({ posts }))
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}

export default getPostsByAuthor