var petsArr = [['percy', 'dog', ['palitos', 'dormir'], 4, 20], ['hiro', ['gambas', 'dormir'], 'cat'], ['cosmo', 'cat'], ['thunder-cat', 'cat'], ['baldeer', 'dog']]
//almacenar datos en arrays anidados implica ser TOTALMENTE CONSISTENTE con el orden de los campos

//console.log(petsArr[1][2][0]) // dificil de leer

var search = prompt('mascota?')

var pets = { percy: { type: 'dog', hobbies: ['palitos', 'dormir'], age: 4, lifeExpectancy: 20 }, hiro: { type: 'cat' }, 'thunder-cat': { type: 'cat' } }

console.log(pets[search])

var allEntries = Object.keys(objectExample);

var timeLeft = pets.percy.lifeExpectancy - pets.percy.age
console.log(timeLeft)

var timeLeft3 = pets['percy']['lifeExpectancy']

var timeLeft2 = petsArr[0][4] - petsArr[0][8]

console.log(timeLeft2)

var allCatsNames = []
for (var i = 0; i < allEntries.length; i++) {
    if (objectExample[allEntries[i]].hobbies) {
        for (var j = 0; j < objectExample[allEntries[i]].hobbies.length; j++) {
            console.log(objectExample[allEntries[i]].hobbies[j])
        }
    }
}

//console.log(allEntries)

//console.log(objectExample.percy)