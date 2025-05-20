import { useEffect, useState } from "react"
import UserCard from "../../components/UserCard"
import PostList from "../../components/PostList"
import logics from "../../logic"
import { useParams } from "react-router"
import NotFound from "../NotFound"
import useCustomContext from "../../hooks/useCustomContext"
import getToken from "../../logic/helpers/getToken"

const UserProfile = () => {
    const [posts, setPosts] = useState()
    const [userId, setUserId] = useState()
    const [refreshPosts, setRefreshPosts] = useState(Date.now())
    const { username } = useParams()

    const { alert } = useCustomContext()

    useEffect(() => {
        try {
            logics.users.getUserIdByUsername(username)
                .then(id => {
                    setUserId(id)
                    logics.posts.getPostsByAuthor(id)
                        .then(retrivedPosts => setPosts(retrivedPosts))
                        .catch(error => alert(error))
                })
                .catch(error => {
                    if (error.message === 'Error: user not found') {
                        setUserId('not-found')
                    } else {
                        alert('hola', error)
                    }
                })
        } catch (error) {
            alert(error)
        }
    }, [refreshPosts])

    return <>
        {
            userId === 'not-found' ? <NotFound />
                :
                <div className="main-container">
                    {
                        userId && <UserCard userId={userId} isMyProfile={userId === getToken()} />
                    }
                    {
                        posts && <PostList posts={posts} setRefreshPosts={setRefreshPosts} handleNavigateToUserProfile={setRefreshPosts} />
                    }
                </div>
        }
    </>
}

export default UserProfile