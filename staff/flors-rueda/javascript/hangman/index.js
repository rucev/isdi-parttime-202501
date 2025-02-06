//Nada más abrir el juego, ya esta activo
//Te muestra con guiones el numero de letras (-----)
//Si le das a cancelar puedes salirte
//5 vidas
//preguntara por una letra
// validar que es una letra
// que sea indiferente si es Mayus o Minus
// si no es una letra, no da fallo
// si es una letra que no esta, da fallo (y avisa de que no esta, resta una vida)
// si es una letra que SÍ esta en el siguiente turno vemos (--ll-)
// si pierdes y no has acertado te quedas igual
// cuando la aciertas te enseña un mensajito

debugger
var word = 'charmander'
var guessedWordArray = [] //almacenara el patrón de la palabra adivinada hasta ahora ([-,-,l,l,-] para hello)
var guessedWord = '' //almacena el patrón pero en un string -----
var lifes = 5;
var alphabet = 'abcdefghijklmnopqrstuvwxyz'
var alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

for (var i = 0; i < word.length; i++) { //esto lo genera de inicio (solo guiones y espacios si hacen falta)
    if (word[i] === ' ') {
        guessedWordArray[guessedWordArray.length] = ' '
    } else {
        guessedWordArray[guessedWordArray.length] = '-'
    }
}

guessedWordToString(); //completa el guessedWord (string) solo con guiones

function validateInputLetter(letter) {
    if (letter.length !== 1 || letter === ' ') { //compruebo que la letra es solo un caracter
        alert('make sure you put a single letter')
        return;
    }
    /*iterar abecedario para comprobar que el caracter es una letra, y pasarlo a minuscula si hace falta*/
    for (var i = 0; i < alphabet.length; i++) {
        if (letter === alphabet[i] || letter === alphabetUpper[i]) { //comparo la misma posición en alfabeto en minusculas y en mayusculas y si hay una coincidencia, me salgo de la función devolviendo la letra en minuscula
            return alphabet[i]
        }
    }
    return;
}

function checkLetterIncluded(letter) { //actualiza guessedWord si la letra esta en word y si no resta una vida
    var isLetterInWord = false //partimos de la idea de que la letra no esta en la palabra a adivinar
    for (var i = 0; i < word.length; i++) { //iteramos la palabra para ver si contiene la letra 
        if (letter === word[i]) {
            isLetterInWord = true //cambiamos la variable que partia de la idea de que la letra no esta, porque sí que esta
            guessedWordArray[i] = letter
        }
    }
    if (isLetterInWord === false) { //en caso de que la letra no este, resta una vida
        lifes--
    }
}

function guessedWordToString() { //función para pasar el array a string
    guessedWord = ''
    for (var i = 0; i < guessedWordArray.length; i++) {
        guessedWord += guessedWordArray[i]
    }
}

alert('Welcome to the Hangman game, try to guess the word!')

while (guessedWord !== word && lifes !== 0) {
    var guessedLetter = prompt(`This is all you know about the word so far: \n   ${guessedWord} \nYou have ${lifes} lifes`)
    if (guessedLetter === null) {
        lifes = 0 //para cancelar la condicion del while si quiero salirme
        alert('ok, bye')
    } else {
        var validatedLetter = validateInputLetter(guessedLetter)
        if (validatedLetter !== undefined) {
            checkLetterIncluded(validatedLetter) //guessedWordArray se actualiza si la letra esta dentro
            guessedWordToString() //actualizar el string para asegurarme de que si he completado la palabra no vuelvo a entrar en el bucle
        }
    }

}

if (lifes === 0) {
    alert('oooh! you loser, better luck next time')
}

if (guessedWord === word) {
    alert(`congrats, you win! The word was: ${word}`)
}

