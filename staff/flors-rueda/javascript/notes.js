var str = "a";
var str1 = "wo   rdfqre!!!sadas";
var str2 = "1";

var str3 = ':D';
var str4 = `Hola \n${str3}`;

var num = 1;
var numInt = 9823;

var numFloat = 0.23;

var experiment = str + num

var experiment2 = str2 + num

var experiment3 = `${str2}${num}`

var experiment4 = num + numFloat

var arrr = ['a', 12, [1, 'b', [experiment4]], experiment3]




for (var index = 0; index < arrr.length; index++) {
    if (arrr[index].length) {
        //alert(arrr[i])
        /*
        Hola                
        :D
        */
    }
}
/*
var truth = true
var truth2 = 'true'

num == numInt

!false === true // devolveria true (lo contrario a false es igual true)

false === !true // devolveria true (false es igual a lo contrario de true)

false !== true // devolveria true (false NO es igual a true)

false === true // devolveria false (false es igual a true (y eso no es cierto))

1 < 2 // true
1 <= 2 // true
1 < 1 // false
1 <= 1 // true
1 > 2 // false
1 >= 1 // true

var arr = [1, 2, 3, 4];


var i = 0;
while (i < arr.length) {
    console.log(arr[i]);
    i++
}

for (var i = 0; i < arr.length; i++) {
    console.log(arr[i])
}


var arr = [1, 2, 3, 4];
var i = 0;
while (i < arr.length) {
    if (i < arr.length / 2) {
        //alert(arr[i]);
    }
    i++
}


function myConsoleLog(text) {
    alert(text);
    console.log(text);
}
*/

/*
alert() --> parecido a un console.log
var variableName = prompt() --> captura el input del usuario y lo asigna a variableName
var bool = confirm() --> captura de nuevo el input: aceptar = true, cancelar = false
*/

//OBJETOS:

var rounds = [
    { wasRoundWon: true, tries: 3 },
    { wasRoundWon: true, tries: 2 },
    { wasRoundWon: false, tries: 4 },
    { wasRoundWon: true, tries: 1 }
]

console.log(rounds[1]['tries'], rounds[1].tries)