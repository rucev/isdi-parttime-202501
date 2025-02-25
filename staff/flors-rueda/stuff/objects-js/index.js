var petsArr = [['percy', 'dog', ['palitos', 'dormir'], 4, 20], ['hiro', ['gambas', 'dormir'], 'cat'], ['cosmo', 'cat'], ['thunder-cat', 'cat'], ['baldeer', 'dog']]
//almacenar datos en arrays anidados implica ser TOTALMENTE CONSISTENTE con el orden de los campos

//console.log(petsArr[1][2][0]) // dificil de leer

var search = prompt('mascota?')

var pets = { percy: { type: 'dog', hobbies: ['palitos', 'dormir'], age: 4, lifeExpectancy: 20 }, hiro: { type: 'cat' }, 'thunder-cat': { type: 'cat' } }

pets['cosmo'] = { type: 'cat' }
pets.baldeer = { type: 'dog' }


console.log(pets[search])

var allEntriesKeys = Object.keys(pets);

var timeLeft = pets.percy.lifeExpectancy - pets.percy.age
//console.log(timeLeft)

var lifeExpectancy = pets['percy']['lifeExpectancy']

var timeLeft2 = petsArr[0][4] - petsArr[0][8]

//console.log(timeLeft2)

var allCatsNames = []
for (var i = 0; i < allEntriesKeys.length; i++) {
    if (objectExample[allEntriesKeys[i]].hobbies) {
        for (var j = 0; j < objectExample[allEntriesKeys[i]].hobbies.length; j++) {
            //console.log(objectExample[allEntriesKeys[i]].hobbies[j])
        }
    }
}

//console.log(allEntriesKeys)

//console.log(objectExample.percy)