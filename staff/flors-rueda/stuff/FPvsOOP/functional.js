/* PROGRAMACIÓN FUNCIONAL
- Usa funciones puras y evita mutaciones de estado.
- Prioriza datos inmutables.
- En lugar de modificar el objeto, se devuelve uno nuevo con los cambios.
*/

const createNewUser = (username, email, password, avatar) => {
    const user = {
        username,
        email,
        password,
        avatar,
        id: Date.now()
    }

    return user
}

const updateUsername = (newUsername, user) => {
    user.username = newUsername
    return user
}

let user1 = createNewUser('pepito', 'pepito@mail.com', '12345!!ASDNks', 'link.png')

console.log(user1.username, user1.id)

user1 = updateUsername('Juan', user1)

console.log(user1.username)

