import { validator } from "common"
import logic from "../../../logic/index.js"

const getHomePosts = (req, res, next) => {
    const id = req.userId

    try {
        validator.id(id)

        logic.getHomePosts(id)
            .then((posts) => res.status(200).send(JSON.stringify({ posts })))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}

export default getHomePosts