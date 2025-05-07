import { validator } from "common"
import logic from "../../../logic/index.js"

const loginUser = (req, res, next) => {
    const { email, password } = req.body
    try {
        validator.email(email)
        validator.password(password)
        return logic.loginUser(email, password)
            .then((id) => res.status(200).send({ id }))
            .catch((error) => next(error))
    } catch (error) {
        next(error)
    }
}

export default loginUser