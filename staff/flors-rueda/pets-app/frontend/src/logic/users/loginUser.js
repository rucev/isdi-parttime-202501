import data from "../../data"
import { AuthError, ExistenceError } from "common/errors"
import validator from "common"

const loginUser = (loginData, callback) => { //{'email': 'patata@mail.com'}
    //comprobamos si el email que ha puesto el usuario esta en la bbdd y si no lo esta, lanzamos un alert
    validator.password(loginData['password'])
    validator.email(loginData['email'])

    const xhr = new XMLHttpRequest()

    xhr.open('POST', `${import.meta.env.VITE_PETS_API}/users/auth`, true)

    const user = { email: loginData.email, password: loginData.password }


    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const id = xhr.response

                if (loginData['remember']) {
                    localStorage.id = id
                } else {
                    sessionStorage.id = id
                }
                callback(null)
            } else {
                callback(xhr.response)
            }
        }
    }

    xhr.send(JSON.stringify(user))







    //y si se cumple todo, guardamos el id en el session storage y navegamos a home*/

}

export default loginUser