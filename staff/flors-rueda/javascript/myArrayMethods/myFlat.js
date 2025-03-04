console.info('running code')

function myFlat(array, deepIndex = 1) {
    var resultArray = [] //declaro el array que devolvera la función
    var doesArrayStillHaveNestedArrays = false

    for (var i = 0; i < array.length; i++) { //itero una única vez el array parametro
        if (array[i].constructor !== Array) { //y si el item que hay en ese indice NO es un array
            resultArray[resultArray.length] = array[i] //lo pusheo al array resultado
        } else { //si SÍ es un array, lo iteramos
            for (var j = 0; j < array[i].length; j++) {
                resultArray[resultArray.length] = array[i][j] //pusheamos los valores dentro de ese segundo array
                if (array[i][j].constructor === Array) { //en caso de que alguno de esos valores sea un array
                    doesArrayStillHaveNestedArrays = true //modificamos el booleano de arrays anidados pasandolo a true
                }
            }
        }
    }

    deepIndex = deepIndex === Infinity ? Infinity : deepIndex - 1 //si deepIndex === Infinity se queda tal cual, pero si es un valor numerico le resto 1

    if ((deepIndex !== Infinity && deepIndex > 0) || (deepIndex === Infinity && doesArrayStillHaveNestedArrays)) {
        //entro en este if si el deepIndex todavia no es cero y el usuario me aplane más mi array
        //o si el deepIndex es infinity y aun quedan arrays anidados
        return myFlat(resultArray, deepIndex)
    } else {
        return resultArray
    }
}

//Función para pasar el assert a dos arrays que puede que tengan otros arrays anidados
function nestedArrayAssert(array1, array2) {
    var lengthToTest = array1.length > array2.length ? array1.length : array2.length;
    for (var i = 0; i < lengthToTest; i++) {
        if (array1[i].constructor !== Array && array2[i].constructor !== Array) {
            console.assert(array1[i] === array2[i], `index ${i} is diferent in both arrays. ${array1[i]} !== ${array2[i]}`);
        } else {
            nestedArrayAssert(array1[i], array2[i])
        }
    }
}

//Tests pasando un numero como deepIndex
console.info('tests with deepIndex === 2')
var arrayControl = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán', ['AAAA']]], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta']
var arrayTest = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán', ['AAAA']]], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta']

var elementControlNumber = arrayControl.flat(2)
var elementTestNumber = myFlat(arrayTest, 2)

nestedArrayAssert(arrayControl, arrayTest)
nestedArrayAssert(elementControlNumber, elementTestNumber)

//Tests no pasando nada como deepIndex
console.info('tests with no deepIndex')
arrayControl = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán', ['AAAA']]], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta']
arrayTest = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán', ['AAAA']]], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta']

var elementControlNoDeep = arrayControl.flat()
var elementTestNoDeep = myFlat(arrayTest)

nestedArrayAssert(arrayControl, arrayTest)
nestedArrayAssert(elementControlNoDeep, elementTestNoDeep)

//Tests pasando Infinity como deepIndex
console.info('tests with deepIndex === Infinity')
arrayControl = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán', ['AAAA']]], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta']
arrayTest = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán', ['AAAA']]], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta']

var elementControlInfinity = arrayControl.flat(Infinity)
var elementTestInfinity = myFlat(arrayTest, Infinity)

nestedArrayAssert(arrayControl, arrayTest)
nestedArrayAssert(elementControlInfinity, elementTestInfinity)