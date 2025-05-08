import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

const deletePost = (postId) => {
    validator.id(postId)
    return fetch(`${import.meta.env.VITE_API_APP}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${getLoggedUserId()}`
        }
    })
        .then((response) => {
            if (response.status === 200) return
            else {
                response.json().then(body => {
                    throw new Error(body.message)
                })
            }
        })
        .catch(error => { throw new Error(error.message) })
}

export default deletePost