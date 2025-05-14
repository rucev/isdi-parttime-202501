import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

const getUserUsername = (userId) => {
    validator.id(userId)

    return fetch(`${import.meta.env.VITE_API_APP}/users/username/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${getLoggedUserId()}`
        }
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(body => {
                    return body.username
                })
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default getUserUsername