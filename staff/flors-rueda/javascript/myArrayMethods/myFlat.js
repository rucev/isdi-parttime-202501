console.info('running code')

function myFlat(array, deepIndex = 1) {
    var resultArray = [];
    var isInfinityOn = deepIndex === Infinity;
    if (isInfinityOn) {
        deepIndex = 0;
    }
    var doesArrayStillHaveNestedArrays = false

    for (var i = 0; i < array.length; i++) {
        if (array[i].constructor !== Array) {
            resultArray[resultArray.length] = array[i]
        } else {
            doesArrayStillHaveNestedArrays = true
            for (var j = 0; j < array[i].length; j++) {
                resultArray[resultArray.length] = array[i][j]
            }
        }
    }

    deepIndex = isInfinityOn ? Infinity : deepIndex - 1

    if (deepIndex > 0 || (isInfinityOn && doesArrayStillHaveNestedArrays)) {
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

var elementControlInfinity = arrayControl.flat()
var elementTestInfinity = myFlat(arrayTest)


nestedArrayAssert(arrayControl, arrayTest)
nestedArrayAssert(elementControlInfinity, elementTestInfinity)