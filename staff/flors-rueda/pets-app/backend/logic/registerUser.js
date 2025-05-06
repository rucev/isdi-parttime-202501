import { errors } from "common"
import { data } from "../data/index.js"


const registerUser = (email, password, username) => {
    return data.users.findOne({ email: email })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (user) { throw new errors.DuplicityError('user already exists') }

            return data.users.insertOne({ email, password, username })
                .catch(error => { throw new errors.ServerError(error.message) })
        })
}

export default registerUser