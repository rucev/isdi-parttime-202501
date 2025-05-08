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

//TEN EN CUENTA:
//Las funciones (asincronas) devuelven una promesa, cuando se resuelve devuelve un string, cuando falla da un error.
//El error lo rompe todo, hay que controlaro. El message es aquello que tienes que consologuear.

//Las funciones sincronas también devuelven mensajes y errores, piensa en consologuearlas

//Añade las funciones para que se realicen en el siguiente orden:
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

//IMPORTANTE: Controla errores tanto síncronos como asincronos,
// muestra la variable ERROR_MSG en un console.log en caso de que haya cualquier tipo de error, en lugar de dejar que js lance el error

//Ejecuta el código entrando a la carpeta y haciendo `npm run start`

const yourAverageSaturdayAfternoon = () => {
    try {
        console.log(decideToGoToTheMovies())
        searchForFriend().then(msg => console.log(msg)).catch(error => console.log(error.message))
    } catch (error) {
        console.log(error.message)
    }
    /*
    ¡Sigue el ejemplo y completa el código dentro de esta función! :D
    */
}

yourAverageSaturdayAfternoon()
