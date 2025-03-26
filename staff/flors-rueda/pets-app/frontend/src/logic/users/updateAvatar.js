import data from "../../data"

const updateAvatar = (id, newAvatar) => {
    const user = data.users.findUserById(id)
    if (user) return
    user.avatar = newAvatar
    data.users.updateUserById(id, user)
}

export default updateAvatar