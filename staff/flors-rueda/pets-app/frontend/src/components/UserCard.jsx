import { useEffect, useState } from "react"
import logics from "../logic"
import UserAvatar from "./UserAvatar"

const UserCard = ({ userId, refreshSelf, tempAvatar }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            logics.users.getUserUsername(userId)
                .catch(error => alert(error))
                .then((retrivedUsername) => {
                    logics.users.getUserAvatar(userId)
                        .catch(error => alert(error))
                        .then(retrivedAvatar => {
                            logics.users.getUserBio(userId)
                                .then(retrivedBio => setUser({ avatar: retrivedAvatar, username: retrivedUsername, bio: retrivedBio }))
                                .catch(error => alert(error))
                        })
                })
        } catch (error) {
            alert(error)
        }

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