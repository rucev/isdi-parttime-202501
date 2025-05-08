import getLoggedUserId from "../helpers/getLoggedUserId"

const updateAvatar = (newAvatar) => {
    //validator.imgUrl(newAvatar)

    const avatar = { avatar: newAvatar }

    return fetch(`${import.meta.env.VITE_API_APP}/users/avatar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${getLoggedUserId()}`
        },
        body: JSON.stringify(avatar)
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

export default updateAvatar