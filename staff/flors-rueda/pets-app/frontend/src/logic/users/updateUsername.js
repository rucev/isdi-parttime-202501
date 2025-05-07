import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

//TODO Add ID validators to everywhere

const updateUsername = (newUsername, callback) => {
    validator.username(newUsername)

    return fetch(`${import.meta.env.VITE_API_APP}/users/username`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${getLoggedUserId()}`
        },
        body: JSON.stringify({ username: newUsername })
    })
        .then((response) => {
            if (response.status === 200) {
                return
            } else {
                return response.json().then(body => {
                    throw new Error(body.message)
                })
            }
        }).catch(error => {
            throw new Error(error)
        })

}

export default updateUsername