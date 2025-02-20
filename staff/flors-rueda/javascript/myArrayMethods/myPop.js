// Pop

//parametros: array

// devuelve el elemento eliminado del array y en caso de que el array esta vacio --> length === 0 devuelve undefined
// elimina el último valor de ("this" === array original) ---> (lo modifica) (x)

// Variables necesarias:
// array control --> aplicaremos el metodo pop nativo de js
// array de test --> aplicaremos el metodo que hemos hecho nosotros
// element control --> almacena lo que devuelve el pop nativo de js
// element de test ---> almacena lo que devuelve nuestro pop


var controlArray = ['hola', 'qué', 'tal', '?'];
var testArray = ['hola', 'qué', 'tal', '?'];
var controlElement;
var testElement;

//Ejecutar función nativa js
controlElement = controlArray.pop();


//Crear mi función
function myPop(arr) {
    if (arr.length === 0) return undefined

    var value = arr[arr.length - 1]
    --arr.length
    return value
}

//Ejecutar mi funcion
testElement = myPop(testArray)


//Ejecutar los tests
console.info('running tests')

var lengthToTest = controlArray.length > testArray.length ? controlArray.length : testArray.length;

for (var i = 0; i < lengthToTest; i++) {
    console.assert(testArray[i] === controlArray[i], `index ${i} is diferent in both arrays. ${testArray[i]} !== ${controlArray[i]}`);
}

console.assert(controlElement === testElement, `does not return the correct value. ${controlElement} !== ${testElement}`)

//creo variables para un caso poco frecuente (límite)
console.assert([].pop() === myPop([]), `should return undefined but returns: ${myPop([])}`)
