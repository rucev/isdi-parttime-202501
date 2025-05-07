import { errors } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const getUserAvatar = () => {

    return fetch(`${import.meta.env.VITE_API_APP}/users/avatar`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${getLoggedUserId()}`
        }
    }).then((response) => {
        if (response.status === 200) {
            return response.json().then(body => {
                return body.avatar
            })
        } else {
            return response.json().then(body => {
                throw new Error(body.message)
            })
        }
    }).catch(error => {
        throw new Error(error)
    })

}

export default getUserAvatar