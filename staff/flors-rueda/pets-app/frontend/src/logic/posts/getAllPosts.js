import data from "../../data";
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

const getAllPosts = () => {

    return fetch(`${import.meta.env.VITE_API_APP}/posts`, {
        method: 'GET',
        headers: { Authorization: `Basic ${getLoggedUserId()}` }
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

export default getAllPosts