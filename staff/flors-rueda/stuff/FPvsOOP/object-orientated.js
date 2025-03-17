/* PROGRAMACIÓN ORIENTADA A OBJETOS
- Se usan clases y objetos con métodos.
- Se modifica el estado interno del objeto usando esos métodos.
*/

class User {
    constructor(username, email, password, avatar) {
        this.username = username
        this.email = email
        this.password = password
        this.avatar = avatar
        this.id = Date.now()
    }

    updateUsername = (newUsername) => {
        this.username = newUsername
    }

    updateEmail = (newEmail) => {
        this.newEmail = newEmail
    }
}

const user1 = new User('pepito', 'pepito@mail.com', '12345!!ASDNks', 'link.png')

console.log(user1.username, user1.id)

user1.updateUsername('Juan')

console.log(user1.username)