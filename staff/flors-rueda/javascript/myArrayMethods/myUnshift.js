var arrTest = [1, 2, 3, 4]
var arrControl = [1, 2, 3, 4]

var resultControl = arrControl.unshift(5, 6, 7)

function myUnshift(array) {
    var legthToAdd = arguments.length - 1;

    array.length = array.length + legthToAdd;
    for (var i = array.length - 1; i >= 0; i--) {
        if (i >= legthToAdd) {
            array[i] = array[i - legthToAdd]
        } else {
            array[i] = arguments[i + 1]
        }

    }

    return array.length
}

var resultTest = myUnshift(arrTest, 5, 6, 7)

console.assert(resultControl === resultTest, 'both functions return the same');

for (var i = 0; i < arrControl.length; i++) {
    console.assert(arrTest[i] === arrControl[i], `index ${i} is diferent in both arrays. ${arrTest[i]} !== ${arrControl[i]}`);
}