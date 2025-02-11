//Lógica del juego
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

function playGame(letter) {
    var validatedLetter = validateInputLetter(letter)
    if (validatedLetter !== undefined) {
        checkLetterIncluded(validatedLetter) //guessedWordArray se actualiza si la letra esta dentro
        guessedWordToString() //actualizar el string para asegurarme de que si he completado la palabra no vuelvo a entrar en el bucle
        //limpiamos la interfaz (porque tiene la info de la ronda anterior)
        cleanInterface();
        //renderizamos la interfaz de nuevo, con la info de la ronda actual
        renderInterface();
    }
}

//Empezamos a manejar el renderizado a html
var body = document.body; //---> nos traemos el body
var wordContainer;
var lifesContainer;
var letterFormContainer;

//Estilos del body
body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.gap = '2rem';

//Creamos el titulo y le damos estilos
var gameTitle = document.createElement('h1');
gameTitle.textContent = 'THE HANGMAN GAME';
gameTitle.style.textAlign = 'center';

//Añadimos el titulo al body
body.appendChild(gameTitle);


//Genera la interfaz visual del juego
function renderInterface() {
    //Creamos el contenedor para las letras (o cuadrados vacios) de la palabra a adivinar
    wordContainer = document.createElement('div');
    //Damos estilos
    wordContainer.style.width = '100%';
    wordContainer.style.display = 'flex';
    wordContainer.style.flexDirection = 'row';
    wordContainer.style.gap = '0.5rem';
    wordContainer.style.justifyContent = 'center';

    //Creamos cada cuadradito para espacio vacio sin adivinar ['-', 'a', '-']
    for (var i = 0; i < guessedWordArray.length; i++) {
        var letterSquare = document.createElement('div');
        //le damos estilos
        letterSquare.style.height = "2rem";
        letterSquare.style.width = "2rem";
        letterSquare.style.border = "2px dashed slategray"
        letterSquare.style.display = "flex";
        letterSquare.style.justifyContent = "center"
        letterSquare.style.alignItems = "center"
        if (guessedWordArray[i] !== '-') {
            var letterContainer = document.createElement('b');
            letterContainer.textContent = guessedWordArray[i].toUpperCase();
            letterSquare.style.border = "2px solid green"
            letterSquare.style.backgroundColor = "fuchsia"
            letterSquare.appendChild(letterContainer)
        }

        //lo añadimos al contenedor
        wordContainer.appendChild(letterSquare)
    }

    //Creamos un contenedor para los iconos que representan vidas
    lifesContainer = document.createElement('div');
    //Añadir estilos
    lifesContainer.style.width = '100%';
    lifesContainer.style.display = 'flex';
    lifesContainer.style.flexDirection = 'row';
    lifesContainer.style.gap = '1rem';
    lifesContainer.style.justifyContent = 'center';

    //Creamos un iconito para cada vida que queda
    for (var i = 0; i < lifes; i++) {
        var lifeIcon = document.createElement('div');
        lifeIcon.style.width = '1rem';
        lifeIcon.style.height = '1rem';
        lifeIcon.style.borderRadius = '50%';
        lifeIcon.style.backgroundColor = 'red'
        //Lo añadimos al contenedor
        lifesContainer.appendChild(lifeIcon)
    }

    //Creamos el formulario para la letra
    letterFormContainer = document.createElement('form');
    //estilizamos el form
    letterFormContainer.style.display = 'flex';
    letterFormContainer.style.flexDirection = 'row';
    letterFormContainer.style.width = '100%';
    letterFormContainer.style.gap = '0.5rem';
    letterFormContainer.style.justifyContent = 'center';

    var letterInput = document.createElement('input');
    letterInput.type = 'text';
    letterInput.minLength = 1;
    letterInput.maxLength = 1;
    letterInput.required = true;
    letterInput.id = 'letter';
    letterInput.style.width = '2rem'

    var submitButton = document.createElement('input');
    submitButton.type = 'submit';

    letterFormContainer.appendChild(letterInput);
    letterFormContainer.appendChild(submitButton);

    //Añadimos los contenedores al body
    body.appendChild(wordContainer)
    body.appendChild(lifesContainer)
    body.appendChild(letterFormContainer)
}


//Limpia y elimnina todo lo relativo a la interfaz del juego
function cleanInterface() {
    body.removeChild(wordContainer);
    body.removeChild(lifesContainer)
    body.removeChild(letterFormContainer)
    wordContainer = undefined;
    lifesContainer = undefined;
    letterFormContainer = undefined;
}

//TODO para hacer en clase juntos: añadir mensaje de victoria o derrota, añadir mensaje de "ese input no" cuando alguien intente pasar numeros o algo incorrecto


//Renderizamos la interfaz la primera vez que entra el usuario a la pagina
renderInterface()

//función nativa de js que "escucha" la interacción del usuario con la interfaz.
// En este caso detecta cuando alguien pulsa un botón submit. El event es el form donde este ese botón submit,
// por eso podemos traernos "letter", porque tenemos un input con un id "letter"
addEventListener('submit', function (event) {
    event.preventDefault();
    var letterValue = event.target.letter.value;
    playGame(letterValue)
    //event.stopImmediatePropagation() --> sirve para no llamar al mismo tipo de evento varias veces
})


