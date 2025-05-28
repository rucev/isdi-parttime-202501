import { useNavigate } from "react-router"
import logics from "../logic"
import UserAvatar from "./UserAvatar"
import Btn from "./lib/Btn"
import useCustomContext from "../hooks/useCustomContext"
import { useState } from "react"
import Comments from "./Comments"

const Post = ({ postData, setRefreshPosts, isMyPostsPage }) => {
    const navigate = useNavigate()
    const [displayComments, setDisplayComments] = useState(false)

    const { alert, confirm } = useCustomContext()

    const handleLikePost = (id) => {
        try {
            logics.posts.toggleLike(id)
                .then(() => {
                    setRefreshPosts(Date.now())
                })
                .catch(error => alert(error))
        } catch (error) {
            alert('ups, something is not working!')
            alert(error)
        }
    }

    const handleDeletePost = (id) => {
        try {
            confirm('you sure you want to delete?').then(isUserSure => {
                if (isUserSure) {
                    logics.posts.deletePost(id)
                        .then(() => setRefreshPosts(Date.now()))
                        .catch((error) => alert(error))
                }
            })
        } catch (error) {
            alert(error)
        }
    }

    return <div className="post-card">
        {
            isMyPostsPage && <Btn
                btnClassnames={'post-card__delete-button'}
                btnCallback={() => handleDeletePost(postData.id)}
                btnContent={<i className="bi bi-trash-fill"></i>}
            />
        }
        <div className="post-card__creation-info">
            <span className="post-card__author">
                {postData.author && <UserAvatar
                    size='md'
                    avatar={postData.author.avatar}
                    letter={postData.author.username[0]}
                    buttonCallback={() => navigate(`/profile/${postData.author.username}`)}
                />
                }
                <span className="font-bold">{postData.author.username}</span>
            </span>
            {postData.createdOn}
        </div>
        <h3 className="post-card__title">{postData.title}</h3>
        <p className="post-card__description">{postData.description}</p>
        {
            postData.img && <div className="post-card__img-container">
                <img className="post-card__img" src={postData.img} />
            </div>
        }
        <div className="w-full flex justify-between">
            <div className="post-card__like">
                <span onClick={() => handleLikePost(postData.id)} className="post-card__like-btn">
                    {
                        postData.isLiked ?
                            <i className="bi bi-heart-fill"></i>
                            :
                            <i className="bi bi-heart"></i>
                    }
                </span>
                <p>{postData.likes.length}</p>
            </div>
            <i onClick={() => setDisplayComments(!displayComments)} className={`text-2xl cursor-pointer bi ${displayComments ? 'bi-chat' : 'bi-chat-dots'} hover:text-gray-600`} />
        </div>
        {displayComments && <Comments comments={postData.comments} postId={postData.id} />}
    </div>
}

export default Post