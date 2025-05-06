import data from "../../data";
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

const getAllPosts = () => {
    const loggedUserId = getLoggedUserId()

    validator.id(loggedUserId)

    return fetch(`${import.meta.env.VITE_API_APP}/posts`, {
        method: 'GET',
        headers: { Authorization: `Basic ${loggedUserId}` }
    }).then(response => {
        if (response.status === 200) {
            return response.json().then(body => {
                return body.posts
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

export default getAllPosts