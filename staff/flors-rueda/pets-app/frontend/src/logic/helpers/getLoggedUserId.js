const getLoggedUserId = () => {
    let loggedUserId;
    if (localStorage.id) {
        loggedUserId = localStorage.getItem('id');
    } else {
        loggedUserId = sessionStorage.getItem('id'); //comprobar si se ha guardado el id de un usuario loggeado
    }

    return loggedUserId
}

export default getLoggedUserId