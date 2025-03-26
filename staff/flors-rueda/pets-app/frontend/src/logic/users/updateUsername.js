import data from "../../data"

const updateUsername = (newUsername) => {
    let loggedUserId;
    if (localStorage.id) {
        loggedUserId = JSON.parse(localStorage.getItem('id'));
    } else {
        loggedUserId = JSON.parse(sessionStorage.getItem('id')); //comprobar si se ha guardado el id de un usuario loggeado
    }

    const user = data.users.findUserById(loggedUserId)
    if (user) return
    user.username = newUsername
    data.users.updateUserById(loggedUserId, user)
}

export default updateUsername