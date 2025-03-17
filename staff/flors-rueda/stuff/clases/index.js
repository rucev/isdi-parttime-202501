/*
Una clase es una forma de crear objetos con un conjunto de propiedades y métodos predefinidos.
Se introdujeron en ES6 (ECMAScript 2015) como una forma más organizada de trabajar con objetos y herencia.
*/

class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }

    sayName = () => {
        console.log(`Hi, my name is ${this.name}`)
    }

    sayAge = () => {
        console.log(`I'm ${this.age} years old`)
    }
}


class Person extends Animal {
    constructor(name, age, shoeSize) {
        super(name, age)
        this.shoeSize = shoeSize
    }

    sayShoeSize = () => {
        console.log(`I'm ${this.name}. My shoe size is ${this.shoeSize}`)
    }
}

class Dog extends Animal {
    constructor(name, age, breed, isNeutered) {
        super(name, age)
        this.breed = breed;
        this.isNeutered = isNeutered
    }

    sayDogInfo = () => {
        console.log(`${this.name}, is a ${this.breed} who ${this.isNeutered ? 'is neutered' : 'is not neutered'}.`)
    }
}

class SleepyDog extends Dog {
    constructor(name, age, breed, isNeutered, hoursOfSleep) {
        super(name, age, breed, isNeutered)
        this.hoursOfSleep = hoursOfSleep
    }

    sleepInfo = () => {
        console.log(`${this.name} sleeps ${this.hoursOfSleep} hours everyday`)
    }

    updateSleepHours = (newHours) => {
        this.hoursOfSleep = newHours
    }
}

/*
const flors = new Person('Flors', 29, 40)

const percy = new Dog('Percy', 4, 'mix', true)

flors.sayName()
flors.sayShoeSize()

percy.sayName()
percy.sayDogInfo()
*/


const percy = new SleepyDog('Percy', 4, 'mix', true, 17)

percy.sleepInfo()

percy.updateSleepHours(20)

percy.sleepInfo()

console.log(percy.name)

//

class Client extends Person {
    constructor(name, age, shoeSize, monthlyExpenses) {
        super(name, age, shoeSize)
        this.monthlyExpenses = monthlyExpenses
    }
}

const client1 = new Client('Juan', 34, 40, 4000)
const client2 = new Client('Flors', 29, 40, 5000)
const client3 = new Client('Laura', 30, 40, 9999)

const clients = [client1, client2, client3]

console.log(clients.filter(client => client.monthlyExpenses >= 4500))