import { errors, validator } from "common"
import getToken from "../helpers/getToken";

const createComment = (comment, postId) => {
    validator.text(comment, 210, 1, 'Comment-Content') //TODO add to backend
    validator.id(postId)

    return fetch(`${import.meta.env.VITE_API_APP}/posts/comment/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${getToken()}`
        },
        body: JSON.stringify({ comment })
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 201) {
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default createComment