import data from "../../data";
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

const getUserBio = (userId) => {
    validator.id(userId)

    return fetch(`${import.meta.env.VITE_API_APP}/users/bio/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${getLoggedUserId()}`
        }
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(body => {
                    return body.bio
                })
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default getUserBio