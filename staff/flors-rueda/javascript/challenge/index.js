var choices = ['rock', 'paper', 'scissors'];

var body = document.body;

/*
    var img = document.createElement('img')

    img.src = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png'

    button.appendChild(img)
*/


// Crear una función que, pasada la elección hecha por el jugador ejecuta
// una decisión hecha al azar por el CPU
// luego de estas dos decisiones, se comparan y se elige quien gana
// cuando se sabe quien ha ganado, se le avisa de ello al usuario

//que se renderize feedback de lo que ha elegido el usuario y lo que ha
//elegido al azar por parte del cpu

function generateChoiceButton(_choice) {
    var button = document.createElement('button');
    button.textContent = _choice;
    /*Añadir estilos al botón */

    button.addEventListener('click', function () {
        console.log(_choice)
    })
    body.appendChild(button);
}

for (var i = 0; i < choices.length; i++) {
    generateChoiceButton(choices[i])
}
