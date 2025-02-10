var body = document.body

body.style.height = '100vh'

var button = document.createElement('button')
button.textContent = "Click Me :)"
button.style.backgroundColor = 'greenyellow'
button.style.width = '50%'
button.style.height = '50%'
button.style.cursor = 'pointer'
button.className = 'myButton'

button.onclick = function () {
    alert('HOLA!')
};

body.appendChild(button)



