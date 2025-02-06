var arr = [1, 2, 3, 4]
var arrTest = [1, 2, 3, 4]
var thingToPush = 5

console.log(arrTest.push(thingToPush))
console.log(arrTest)

function myPush(array, elementToPush) {
    array[array.length] = elementToPush;
    return elementToPush
}

console.log(myPush(arr, thingToPush))
console.log(arr)
