import users from "./users.js";

const testCallback = (error, response) => {
    if (error) console.log(error)
    else console.log(response)
}

users.createUser({ email: "percy1@mail.com", password: "percy1@mail.com", username: "percy1" }, (error, user) => testCallback(error, user))

users.updateUserById(1745347771309, {
    "email": "hiro@mail.com",
    "password": "12345Aa!",
    "username": "hirito",
    "id": 1745347771309,
    "avatar": "https://www.goodvinilos.com/4608/pegatina-pokemon-charmander.jpg"
}, (error, user) => testCallback(error, user))