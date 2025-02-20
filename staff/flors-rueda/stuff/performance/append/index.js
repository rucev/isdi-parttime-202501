var body = document.body;

var title = document.createElement('h1')
title.textContent = 'Hola Mundo'
var button = document.createElement('button')
button.textContent = 'Hola!'
button.addEventListener('click', function () { alert('HOLA!') })
var title2 = document.createElement('h2')
title2.textContent = 'Mundo Hola'

console.time("Time 'append()'");

body.append(title, button, title2)

console.timeEnd("Time 'append()'");