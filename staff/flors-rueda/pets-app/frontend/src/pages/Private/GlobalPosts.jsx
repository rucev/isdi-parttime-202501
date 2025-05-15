import { useEffect, useRef, useState } from "react"
import PostList from "../../components/PostList"
import Btn from "../../components/lib/Btn"
import CreatePostModal from "../../components/CreatePostModal"
import logics from "../../logic"
import useCustomContext from "../../hooks/useCustomContext"

const GlobalPosts = ({ locale }) => {
    const [refreshPosts, setRefreshPosts] = useState(Date.now())
    const [showNewPostForm, setShowNewPostForm] = useState(false)
    const [posts, setPosts] = useState([])
    const dialogRef = useRef(null)
    const pageRef = useRef(null)
    const formRef = useRef(null)

    const { alert } = useCustomContext()

    useEffect(() => {
        try {
            logics.posts.getAllPosts().then(retrivedPosts => setPosts(retrivedPosts))
                .catch(error => {
                    alert('ups, something is not working!')
                    setPosts([])
                    alert(error)
                })
        } catch (error) {
            alert('ups, something is not working!')
            alert(error)
        }
    }, [refreshPosts])

    const handleOutsideModalClick = (event) => {
        if (!formRef.current.contains(event.target)) {
            setShowNewPostForm(false)
        }
    }

    useEffect(() => {
        if (pageRef.current && showNewPostForm) pageRef.current.addEventListener("click", (event) => handleOutsideModalClick(event))

        if ((dialogRef.current && dialogRef.current.open) && !showNewPostForm) {
            dialogRef.current.close()
        } else if (!(dialogRef.current && dialogRef.current.open) && showNewPostForm) {
            dialogRef.current.showModal()
        }

        return () => {
            if (pageRef.current) pageRef.current.removeEventListener("click", handleOutsideModalClick);
        };
    }, [showNewPostForm, refreshPosts])

    return <div className="main-container" ref={pageRef}>
        <PostList posts={posts} refreshPosts={refreshPosts} setRefreshPosts={setRefreshPosts} />
        <Btn btnClassnames={'home__new-post-button'} btnContent={'+'} btnCallback={() => setShowNewPostForm(!showNewPostForm)} />
        <dialog ref={dialogRef}>
            <div ref={formRef}>
                <CreatePostModal locale={locale} setRefreshPosts={setRefreshPosts} closeModal={() => setShowNewPostForm(false)} />
            </div>
        </dialog>
    </div>
}

export default GlobalPosts