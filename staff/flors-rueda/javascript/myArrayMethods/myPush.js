var arrTest = [1, 2, 3, 4]
var arrControl = [1, 2, 3, 4]
var thingToPush = 5
var result1 = arrControl.push(thingToPush)

function myPush(array, elementToPush) {
    array[array.length] = elementToPush;
    return elementToPush
}

var result2 = myPush(arrTest, thingToPush)

console.assert(result1 === result2, 'both functions return the same');

for (var i = 0; i < arrControl.length; i++) {
    console.assert(arrTest[i] === arrControl[i], `index ${i} is diferent in both arrays. ${arrTest[i]} !== ${arrControl[i]}`);
}

