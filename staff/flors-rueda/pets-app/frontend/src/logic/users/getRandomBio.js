/*import data from "../../data"
import getLoggedUserId from "../helpers/getLoggedUserId"*/

const getRandomBio = () => {

    return fetch(`${import.meta.env.VITE_JOKE_API_URL}`, {
        method: 'GET'
    })
        .then((response) => {
            let randomBio = ''
            if (response.status !== 200) {
                return response.json().then(body => {
                    throw new Error(body.message)
                })
            } else {
                return response.json()
                    .then(body => {
                        if (body.type === 'single') {
                            randomBio = body.joke
                        }
                        if (body.type === 'twopart') {
                            randomBio = `+ ${body.setup} \n- ${body.delivery}`
                        }

                        return randomBio
                    })
            }
        })
        .catch((error) => {
            throw new Error(error.message)
        })
}

export default getRandomBio