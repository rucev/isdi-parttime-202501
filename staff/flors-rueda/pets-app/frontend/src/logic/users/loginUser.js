import { errors, validator } from "common"

const loginUser = (loginData) => { //{'email': 'patata@mail.com'}
    //comprobamos si el email que ha puesto el usuario esta en la bbdd y si no lo esta, lanzamos un alert
    validator.password(loginData['password'])
    validator.email(loginData['email'])

    const user = { email: loginData.email, password: loginData.password }

    return fetch(`${import.meta.env.VITE_API_APP}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            if (response.status === 200) {
                if (loginData['remember']) {
                    return response.json().then(body => {
                        localStorage.id = body.id
                    })
                } else {
                    return response.json().then(body => {
                        sessionStorage.id = body.id
                    })
                }
            } else {
                return response.json().then(body => {
                    throw new Error(body.message)
                })
            }
        }).catch(error => {
            throw new Error(error)
        })
}

export default loginUser