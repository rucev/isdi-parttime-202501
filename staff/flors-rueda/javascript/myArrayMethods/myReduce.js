const arrayControl = ['ant', 'bison', 'camel', 'duck', 'elephant'] //'ant, bison, camel and more liked this post'
const arrayTest = ['ant', 'bison', 'camel', 'duck', 'elephant']

const concatWords = (accumulator, currentValue, currentIndex, array) => {
    if (currentIndex === 0) {
        return accumulator + currentValue
    } else if (currentIndex <= 2) {
        return accumulator + ', ' + currentValue
    } else if (currentIndex === 3) {
        return accumulator + ' and more'
    } else {
        return accumulator
    }
}

const myReduce = (array, callback, initialValue) => {
    let result = initialValue

    for (let i = 0; i < array.length; i++) {
        let element = callback(result, array[i], i, array)
        result = element
    }

    return result
}


console.log('testing array.reduce()');

let initialValue = ''
let controlResult1 = arrayControl.reduce((element, index, array) => concatWords(element, index, array), initialValue)
let testResult1 = myReduce(arrayTest, concatWords, initialValue)

console.log(controlResult1)
console.log(testResult1)

for (let i = 0; i < arrayControl.length; i++) {
    console.assert(arrayTest[i] === arrayControl[i], `index ${i} is diferent in both arrays. ${arrayTest[i]} !== ${arrayControl[i]}`);
}

let lengthToTest = controlResult1.length > testResult1.length ? controlResult1.length : testResult1.length;
for (let i = 0; i < lengthToTest; i++) {
    console.assert(testResult1[i] === controlResult1[i], `index ${i} is diferent in both arrays. ${testResult1[i]} !== ${controlResult1[i]}`);
}
