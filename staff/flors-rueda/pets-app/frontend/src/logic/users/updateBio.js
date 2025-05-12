import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateBio = (newBio) => {
    validator.text(newBio, 200, 0, 'bio')

    return fetch(`${import.meta.env.VITE_API_APP}/users/bio`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${getLoggedUserId()}`
        },
        body: JSON.stringify({ bio: newBio })
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

export default updateBio