import data from "../../data"
import validator from "../../utils/validators"

const registerUser = (registerData) => { //registerData = {'email': '', 'password': '', 'confirmation-password': ''}
    validator.email(registerData['email'])
    validator.password(registerData['password'])
    const username = registerData['email'].split('@')[0]
    validator.username(username)


    if (!registerData['email'] && !registerData['password'] && !registerData['confirmation-password']) { //!registerData['email'] => registerData['email'] === undefined && registerData['email'] === null
        alert('Register Data Incomplete')
        return;
    }
    if (registerData['password'] !== registerData['confirmation-password']) {
        alert('Password and confirmation password are not the same')
        return
    }
    /*Podriamos longitud, y caracteres de la contraseñar, validar que el mail no esta en uso, etc*/

    //comprobar si el user ya existe

    const doesUserExist = data.users.findUserByEmail(registerData['email'])
    if (doesUserExist) {
        alert('Something went wrong, try again with new credentials')
        return
    }

    const userCreated = { email: registerData['email'], password: registerData['password'], username, id: Date.now() }

    data.users.createUser(userCreated)

    sessionStorage.id = userCreated.id //almacenamos en el sessionStorage el id del usuario que se acaba de registrar y loggear
}

export default registerUser