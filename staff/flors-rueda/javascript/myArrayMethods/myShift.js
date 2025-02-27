var arrTest = [1, 2, 3, 4]
var arrControl = [1, 2, 3, 4]

var resultControl = arrControl.shift()

function myShift(array) {
    if (array.length === 0) return undefined;

    var firstItem = array[0]

    for (var i = 1; i < array.length; i++) {
        array[i - 1] = array[i]
    }

    array.length = array.length - 1;

    return firstItem
}

var resultTest = myShift(arrTest)

console.assert(resultControl === resultTest, 'both functions return the same');

for (var i = 0; i < arrControl.length; i++) {
    console.assert(arrTest[i] === arrControl[i], `index ${i} is diferent in both arrays. ${arrTest[i]} !== ${arrControl[i]}`);
}