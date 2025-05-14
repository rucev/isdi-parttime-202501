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
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) return
            else {
                response.json().then(body => {
                    throw new Error(body.message)
                })
            }
        })

}

export default deletePost