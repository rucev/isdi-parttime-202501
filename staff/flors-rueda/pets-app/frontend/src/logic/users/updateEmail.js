import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateEmail = (newEmail) => {
    validator.email(newEmail)

    return fetch(`${import.meta.env.VITE_API_APP}/users/email`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${getLoggedUserId()}`
        },
        body: JSON.stringify({ email: newEmail })
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default updateEmail