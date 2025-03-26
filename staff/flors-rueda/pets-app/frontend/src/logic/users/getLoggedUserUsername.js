import data from "../../data";

const getLoggedUserUsername = () => {
    let loggedUserId;
    if (localStorage.id) {
        loggedUserId = JSON.parse(localStorage.getItem('id'));
    } else {
        loggedUserId = JSON.parse(sessionStorage.getItem('id')); //comprobar si se ha guardado el id de un usuario loggeado
    }

    const userLogged = data.users.findUserById(loggedUserId)

    return userLogged.username
}

export default getLoggedUserUsername