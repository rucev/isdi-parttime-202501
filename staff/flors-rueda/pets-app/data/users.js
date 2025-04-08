import fs from 'fs';

const users = {
    createUser: (user) => { //e.g user = {email: "percy1@mail.com", password: "percy1@mail.com", username: "percy1", id: 1740600285989}
        fs.readFile('./users.json', (error, data) => {
            if (error) console.error(error)
            let users = JSON.parse(data)
            if (!users) users = []
            user.id = Date.now()
            users.push(user)

            const usersJson = JSON.stringify(users)

            fs.writeFile('./users.json', usersJson, (error) => {
                if (error) console.error(error)
                else return user
            })
        })
    }
}

export default users