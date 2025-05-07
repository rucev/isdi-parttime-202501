import { useEffect, useState } from "react"
import logics from "../logic"
import getLoggedUserId from "../logic/helpers/getLoggedUserId"
import UserAvatar from "./UserAvatar"
import './UserCard.css'

const UserCard = ({ userId, refreshSelf, tempAvatar }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        logics.users.getUserUsername()
            .catch(error => console.error(error))
            .then((retrivedUsername) => {
                logics.users.getUserAvatar()
                    .catch(error => console.error(error))
                    .then(retrivedAvatar => setUser({ avatar: retrivedAvatar, username: retrivedUsername }))
                //TODO: retrive bio
            })
    }, [refreshSelf])


    return <div className="user-card">
        {
            user && <div className="user-card__username-avatar">
                <UserAvatar avatar={tempAvatar ? tempAvatar : user.avatar} letter={user.username[0]} size={'lg'} />
                <h2>{user.username}</h2>

            </div>
        }
        {(user && user.bio) && <p className="user-card__bio"><i className="bi bi-person-circle"></i>{user.bio}</p>}
    </div>
}

export default UserCard