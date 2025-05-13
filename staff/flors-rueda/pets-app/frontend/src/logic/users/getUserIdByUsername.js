import { validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

const getUserIdByUsername = (username) => {
    validator.username(username)

    return fetch(`${import.meta.env.VITE_API_APP}/users/id/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${getLoggedUserId()}`
        }
    })
        .catch(error => {
            throw new Error(error)
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(body => {
                    return body.id
                })
            } else {
                return response.json().then(body => {
                    throw new Error(body.message)
                })
            }
        })
}

export default getUserIdByUsername