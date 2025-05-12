import {
    buyPopcorn,
    buyTicket,
    decideToGoToTheMovies,
    dressUp,
    eatPopcorn,
    pay,
    searchForFriend,
    waitForFriend,
    waitForGreenLight,
    walk,
    watchMovie,
    theresNoPlaceLikeHome,
    ERROR_MSG,
} from './core.js';


//1. Decidir ir al cine (decideToGoToTheMovies)
//2. Busca a alguien que se apunte al plan (searchForFriend)
//3. Ponte algo de ropa (dressUp)
//4. camina al cine (walk) + espera un semaforo (waitForGreenLight) + sigue caminando (walk)
//5. espera a tu acompañante (waitForFriend)
//6. compra la entrada (buyTicket) + pagala (pay)
//7. compra palomitas (buyPopcorn) + pagalas (pay)
//8. comete las palomitas
//9. mira la peli
//10. vuelve a casa (camina+semaforo+camina de nuevo)
//11. Celebra que estas en casa (theresNoPlaceLikeHome)

const yourAverageSaturdayAfternoon = () => {
    try {
        console.log(decideToGoToTheMovies())
        return searchForFriend().then(friend => {
            console.log(friend)
            console.log(dressUp())
            console.log(walk())
            return waitForGreenLight()
                .then(light => {
                    console.log(light)
                    console.log(walk())
                    return waitForFriend()
                        .then(wait => {
                            console.log(wait)
                            return buyTicket()
                                .then(ticket => {
                                    console.log(ticket)
                                    console.log(pay())
                                    return buyPopcorn()
                                        .then(popcorn => {
                                            console.log(popcorn)
                                            console.log(pay())
                                            console.log(eatPopcorn())
                                            return watchMovie()
                                                .then(movie => {
                                                    console.log(movie)
                                                    console.log(walk())
                                                    return waitForGreenLight()
                                                        .then(green => {
                                                            console.log(green)
                                                            console.log(walk())
                                                            console.log(theresNoPlaceLikeHome())
                                                        })
                                                        .catch(error => {
                                                            console.log(error.message)
                                                            console.log(ERROR_MSG)
                                                        })
                                                })
                                                .catch(error => {
                                                    console.log(error.message)
                                                    console.log(ERROR_MSG)
                                                })
                                        })
                                        .catch(error => {
                                            console.log(error.message)
                                            console.log(ERROR_MSG)
                                        })
                                })
                                .catch(error => {
                                    console.log(error.message)
                                    console.log(ERROR_MSG)
                                })
                        })
                        .catch(error => {
                            console.log(error.message)
                            console.log(ERROR_MSG)
                        })
                })
                .catch(error => {
                    console.log(error.message)
                    console.log(ERROR_MSG)
                })
        })
            .catch(error => {
                console.log(error.message)
                console.log(ERROR_MSG)
            })
    } catch (error) {
        console.log(error.message)
        console.log(ERROR_MSG)
    }
}

yourAverageSaturdayAfternoon()
