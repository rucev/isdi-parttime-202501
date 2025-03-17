const arrayControl = ['ant', 'bison', 'camel', 'duck', 'elephant']
const arrayTest = ['ant', 'bison', 'camel', 'duck', 'elephant']

const toUpperCaseFirstLetter = (word, index, array) => {
    let newWord = word[0].toUpperCase()
    for (let i = 1; i < word.length; i++) {
        newWord += word[i]
    }
    return newWord
}

/*
const myForEach = (array, callback) =>{
    for (let i = 0; i < array.length; i++) {
        array[i] = callback(array[i], i, array)
    }
}
*/

const myMap = (array, callback) => {
    const newArray = []

    for (let i = 0; i < array.length; i++) {
        const newElement = callback(array[i], i, array)
        newArray.push(newElement)
    }

    return newArray
}


console.log('testing array.map()');

let controlResult1 = arrayControl.map((element, index, array) => toUpperCaseFirstLetter(element, index, array))
let testResult1 = myMap(arrayTest, toUpperCaseFirstLetter)


for (let i = 0; i < arrayControl.length; i++) {
    console.assert(arrayTest[i] === arrayControl[i], `index ${i} is diferent in both arrays. ${arrayTest[i]} !== ${arrayControl[i]}`);
}

let lengthToTest = controlResult1.length > testResult1.length ? controlResult1.length : testResult1.length;
for (let i = 0; i < lengthToTest; i++) {
    console.assert(testResult1[i] === controlResult1[i], `index ${i} is diferent in both arrays. ${testResult1[i]} !== ${controlResult1[i]}`);
}
