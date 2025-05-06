import { errors } from "common"
import { data } from "../data/index.js"

const loginUser = (email, password) => {

    return data.users.findOne({ email: email })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) { throw new errors.ExistenceError('user not found') }
            if (user.password !== password) { throw new errors.AuthError('invalid credentials') }

            return user._id.toString()
        })
}

export default loginUser