import data from "../../data";
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

const publishPost = (title, description, img) => {
    validator.text(title, 40, 1, 'Post-Title')
    validator.text(description, 210, 1, 'Post-Description')
    //if (postData['img']) validator.imgUrl(postData['img'])

    const postData = { title, description, img }

    return fetch(`${import.meta.env.VITE_API_APP}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${getLoggedUserId()}`
        },
        body: JSON.stringify(postData)
    })
        .catch(error => {
            throw new Error(error)
        })
        .then((response) => {
            if (response.status === 201) {
                return
            } else {
                return response.json().then(body => {
                    throw new Error(body.message)
                })
            }
        })
}

export default publishPost