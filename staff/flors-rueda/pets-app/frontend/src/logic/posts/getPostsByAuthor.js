import { validator } from "common";
import getLoggedUserId from "../helpers/getLoggedUserId";

const getLoggedUserPosts = (userId) => {
    validator.id(userId)

    return fetch(`${import.meta.env.VITE_API_APP}/posts/author/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${getLoggedUserId()}`
        }
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(body => {
                    return body.posts
                })
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default getLoggedUserPosts