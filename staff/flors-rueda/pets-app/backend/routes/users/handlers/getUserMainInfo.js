import { validator } from "common"
import logic from "../../../logic/index.js"

const getUserMainInfo = (req, res, next) => {
    const id = req.userId
    const { userId } = req.params

    try {
        validator.id(id)
        validator.id(userId)
        return logic.getUserMainInfo(id, userId)
            .then(user => { res.status(200).send(user) })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }

}

export default getUserMainInfo