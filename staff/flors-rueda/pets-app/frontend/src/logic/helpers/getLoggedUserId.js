import { validator } from "common";

const getLoggedUserId = () => {
    let loggedUserId;
    if (localStorage.id) {
        loggedUserId = localStorage.getItem('id');
    } else {
        loggedUserId = sessionStorage.getItem('id'); //comprobar si se ha guardado el id de un usuario loggeado
    }

    validator.id(loggedUserId)

    return loggedUserId
}

export default getLoggedUserId