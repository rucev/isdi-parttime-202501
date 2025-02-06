
var goalNumber = Math.floor(Math.random() * 10) + 1; //setea el primer numero a adivinar
var isGameOn = confirm('play?'); //obtiene booleano true/false dependiendo de si quiere jugar

if (isGameOn) { //en caso de que quiera jugar --> ejecutamos el siguiente código
    //Seteamos las variables para el primer turno de la primera ronda
    var counter = 1; //cuenta intentos por ronda
    var errors = 0; //cuenta errores por ronda
    var roundsWon = 0; //cuenta cuantas rondas lleva ganadas el usuario

    var rounds = [/*{ wasRoundWon: true/false, tries: counter}*/] //contiene la info de todas las rondas jugadas

    while (roundsWon < 3 && isGameOn) { //repite el juego hasta que se hayan ganado 3 rondas o el usuario quiera irse
        var guessInput = prompt('try your first guess number'); //primer intento de adivinar un numero
        if (guessInput === null) {  //en caso de que le de a cancelar, salirnos
            isGameOn = false; //salirnos, romper el while de ^^^ aquí encima
            alert('ok bye'); //para despedirnos si no ha intentado acertar, si no
        } else { //en caso de que sí que intente jugar algo (le de a aceptar)
            var guessNumber = Number(guessInput); //convertimos input a numero

            if (guessNumber !== goalNumber) { //si no ha acertado
                errors++ //sumamos un fallo
            }

            // le damos feedback de que tan lejos o cerca esta el numero que ha dicho
            if (guessInput.trim() === '' || isNaN(guessNumber)) { //si lo que ha escrito no es un numero
                alert('A NUMBER!');
            } else if (guessNumber > goalNumber) { //si el intento esta por encima del num correcto
                alert('try less')
                if (guessNumber - 3 <= goalNumber) { //en caso de que este cerca (3 por encima o menos)
                    alert('just a bit')
                } else { //en caso de que tenga más diferencia
                    alert('much less!')
                }
            } else if (guessNumber < goalNumber) { //si el intento esta por debajo del num correcto
                alert('try more')
                if (guessNumber + 3 >= goalNumber) { //en caso de que este cerca (3 por debajo o menos)
                    alert('just a bit')
                } else { //en caso de que tenga más diferencia
                    alert('much more!')
                }
            }
        }

        while (guessNumber !== goalNumber && errors < 4 && isGameOn) {
            // en este se entra cuando no se haya acertado el numero todavia,
            // cuando la ronda no se haya terminado por culpa de cometer demasiados errores
            // mientras el usuario no le haya dado a cancelar

            guessInput = prompt('guess number again'); //preguntamos todas las veces consecutivas después de la primera
            if (guessInput === null) {  //en caso de que le de a cancelar, salirnos
                isGameOn = false; //salirnos, romper el while de ^^^ aquí encima, y también del de fuera de todo ^^^^
                alert('ok bye'); //para despedirnos si no ha intentado acertar, si no
            } else {
                guessNumber = Number(guessInput); //convertimos input a numero

                if (guessNumber !== goalNumber) { //si no ha acertado
                    errors++ //sumamos un fallo
                }

                // le damos feedback de que tan lejos o cerca esta el numero que ha dicho
                if (guessInput.trim() === '' || isNaN(guessNumber)) { //si lo que ha escrito no es un numero
                    alert('A NUMBER!');
                } else if (guessNumber > goalNumber) { //si el intento esta por encima del num correcto
                    alert('try less')
                    if (guessNumber - 3 <= goalNumber) { //en caso de que este cerca (3 por encima o menos)
                        alert('just a bit')
                    } else { //en caso de que tenga más diferencia
                        alert('much less!')
                    }
                } else if (guessNumber < goalNumber) { //si el intento esta por debajo del num correcto
                    alert('try more')
                    if (guessNumber + 3 >= goalNumber) { //en caso de que este cerca (3 por debajo o menos)
                        alert('just a bit')
                    } else { //en caso de que tenga más diferencia
                        alert('much more!')
                    }
                }

                counter++; //seguimos sumando intentos al counter de la ronda, que se inicia en 1
            }
        }

        if (errors === 4) { //coge el numero de errores de la ronda que estabamos jugando y si es 4 hace lo siguiente:
            alert('well, you suck at this. Keep trying in a new round!') //avisar al usuario de que esta ronda ya esta perdida
            rounds.push({ wasRoundWon: false, tries: counter }) //añadir la info de la ronda al array con info de las rondas
            counter = 1; //resetear la información de la ronda para que la siguiente empiece con las variables reiniciadas
            errors = 0; //tambien se reseta
            goalNumber = Math.floor(Math.random() * 10) + 1; //creamos un nuevo num aleatorio
        }

        if (guessNumber === goalNumber) { //en caso de que haya acertado el numero
            rounds.push({ wasRoundWon: true, tries: counter }) //añadir info de la ronda ganadora al array
            counter = 1; //resetear la información de la ronda para que la siguiente empiece con las variables reiniciadas
            errors = 0; //tambien se reseta

            roundsWon++; //añadimos una ronda ganadora al contador de rondas ganadas

            goalNumber = Math.floor(Math.random() * 10) + 1; //creamos un nuevo num aleatorio

            if (roundsWon === 3) { //en caso de que se hayan ganado las tres rondas necesarias para terminar el juego
                isGameOn = false; //avisamos de que el juego no sigue para salirnos del bucle while principal
                var baseMsg = `win! Here's your game data:\n` //creamos un mensaje base de enhorabuena
                for (var index = 0; index < rounds.length; index++) { //iteramos el array de rondas jugadas, 
                    baseMsg = baseMsg + `ROUND ${index + 1}: ${rounds[index].tries}\n` //para añadir al mensaje la info de rondas jugadas
                }
                if (rounds.length === 3) { //manejamos un feedback final en base a las rondas que ha necesitado el usuario para ganar
                    alert(`${baseMsg}\n0.0`)
                } else if (rounds.length <= 5) {
                    alert(`${baseMsg}\nquite good`)
                } else if (rounds.length <= 7) {
                    alert(`${baseMsg}\nmeh`)
                } else {
                    alert(`${baseMsg}\nyou needed way too much tries`)
                }
            } else { //en caso de que haya ganado la ronda pero queden más por jugar
                alert(`keep going! Let's play another round. You need ${3 - roundsWon} more rounds!`) //le avisamos de cuantas necesita para ganar
            }
        }
    }
} else { // en caso de que no quiera jugar, ejecutamos este código
    alert('ok, bye')
}