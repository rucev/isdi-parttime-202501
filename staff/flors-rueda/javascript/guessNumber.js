function guessNumber() {
    var number = 4;
    var guess = prompt('en qué número crees que estoy pensando?');
    if (number/*.toString()*/ === Number(guess)) {
        alert('Enhorabuena!')
    } else {
        alert('Buuuh! Perdedor!')
    }
}

var isGameOn = confirm('Quieres jugar a un juego?')

if (isGameOn) {
    guessNumber()
} else {
    alert('pues vete')
}
