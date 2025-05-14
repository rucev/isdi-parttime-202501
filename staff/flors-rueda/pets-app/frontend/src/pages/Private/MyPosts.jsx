import { useEffect, useState } from "react"
import logics from "../../logic"
import getLoggedUserId from "../../logic/helpers/getLoggedUserId"
import PostList from "../../components/PostList"
import useCustomContext from "../../hooks/useCustomContext"

const MyPosts = () => {
    const [posts, setPosts] = useState()
    const [refreshPosts, setRefreshPosts] = useState(Date.now())

    const { alert } = useCustomContext()

    useEffect(() => {
        try {
            logics.posts.getPostsByAuthor(getLoggedUserId())
                .then(retrivedPosts => {
                    setPosts(retrivedPosts)
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }


    }, [refreshPosts])

    return <div className="main-container">
        <PostList posts={posts} setRefreshPosts={setRefreshPosts} isMyPostsPage={true} />
    </div>
}

export default MyPosts