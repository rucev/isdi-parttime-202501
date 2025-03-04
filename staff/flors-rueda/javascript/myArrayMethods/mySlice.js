var arrayControl = ['ant', 'bison', 'camel', 'duck', 'elephant']
var arrayTest = ['ant', 'bison', 'camel', 'duck', 'elephant']

function mySlice(array, start, end) {
    /*your slice code here!*/
}


console.log('testing array.slice(2)');

var controlResult1 = arrayControl.slice(2)
var testResult1 = mySlice(arrayTest, 2)


for (var i = 0; i < arrayControl.length; i++) {
    console.assert(arrayTest[i] === arrayControl[i], `index ${i} is diferent in both arrays. ${arrayTest[i]} !== ${arrayControl[i]}`);
}

var lengthToTest = controlResult1.length > testResult1.length ? controlResult1.length : testResult1.length;
for (var i = 0; i < lengthToTest; i++) {
    console.assert(testResult1[i] === controlResult1[i], `index ${i} is diferent in both arrays. ${testResult1[i]} !== ${controlResult1[i]}`);
}

console.log('testing array.slice(2, 4)');

var controlResult2 = arrayControl.slice(2, 4)
var testResult2 = mySlice(arrayTest, 2, 4)

for (var i = 0; i < arrayControl.length; i++) {
    console.assert(arrayTest[i] === arrayControl[i], `index ${i} is diferent in both arrays. ${arrayTest[i]} !== ${arrayControl[i]}`);
}

lengthToTest = controlResult2.length > testResult2.length ? controlResult2.length : testResult2.length;
for (var i = 0; i < lengthToTest; i++) {
    console.assert(testResult2[i] === controlResult2[i], `index ${i} is diferent in both arrays. ${testResult2[i]} !== ${controlResult2[i]}`);
}

console.log('testing array.slice(1, 5)');

var controlResult3 = arrayControl.slice(1, 5)
var testResult3 = mySlice(arrayTest, 1, 5)

for (var i = 0; i < arrayControl.length; i++) {
    console.assert(arrayTest[i] === arrayControl[i], `index ${i} is diferent in both arrays. ${arrayTest[i]} !== ${arrayControl[i]}`);
}

lengthToTest = controlResult3.length > testResult3.length ? controlResult3.length : testResult3.length;
for (var i = 0; i < lengthToTest; i++) {
    console.assert(testResult3[i] === controlResult3[i], `index ${i} is diferent in both arrays. ${testResult3[i]} !== ${controlResult3[i]}`);
}

console.log('testing array.slice(-2)');

var controlResult4 = arrayControl.slice(-2)
var testResult4 = mySlice(arrayTest, -2)

for (var i = 0; i < arrayControl.length; i++) {
    console.assert(arrayTest[i] === arrayControl[i], `index ${i} is diferent in both arrays. ${arrayTest[i]} !== ${arrayControl[i]}`);
}

lengthToTest = controlResult4.length > testResult4.length ? controlResult4.length : testResult4.length;
for (var i = 0; i < lengthToTest; i++) {
    console.assert(testResult4[i] === controlResult4[i], `index ${i} is diferent in both arrays. ${testResult4[i]} !== ${controlResult4[i]}`);
}

console.log('testing array.slice(2, -1)');

var controlResult5 = arrayControl.slice(-2)
var testResult5 = mySlice(arrayTest, -2)

for (var i = 0; i < arrayControl.length; i++) {
    console.assert(arrayTest[i] === arrayControl[i], `index ${i} is diferent in both arrays. ${arrayTest[i]} !== ${arrayControl[i]}`);
}

lengthToTest = controlResult5.length > testResult5.length ? controlResult5.length : testResult5.length;
for (var i = 0; i < lengthToTest; i++) {
    console.assert(testResult5[i] === controlResult5[i], `index ${i} is diferent in both arrays. ${testResult5[i]} !== ${controlResult5[i]}`);
}

console.log('testing array.slice()');

var controlResult6 = arrayControl.slice()
var testResult6 = mySlice(arrayTest)

for (var i = 0; i < arrayControl.length; i++) {
    console.assert(arrayTest[i] === arrayControl[i], `index ${i} is diferent in both arrays. ${arrayTest[i]} !== ${arrayControl[i]}`);
}

lengthToTest = controlResult6.length > testResult6.length ? controlResult6.length : testResult6.length;
for (var i = 0; i < lengthToTest; i++) {
    console.assert(testResult6[i] === controlResult6[i], `index ${i} is diferent in both arrays. ${testResult6[i]} !== ${controlResult6[i]}`);
}
