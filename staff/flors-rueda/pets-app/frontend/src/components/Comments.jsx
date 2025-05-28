import { useEffect, useState } from "react"
import useCustomContext from "../hooks/useCustomContext"
import logics from "../logic"
import Form from "./lib/Form"
import UserAvatar from "./UserAvatar"
import { useNavigate } from "react-router"

const Comments = ({ comments, postId }) => {
    const commentFormObject = { label: 'Your comment', inputType: 'text-area', inputPlaceholder: 'What do you think about this?', inputId: 'comment', isRequired: true }
    const { alert } = useCustomContext()
    const navigate = useNavigate()
    const [commentsToDisplay, setCommentsToDisplay] = useState(comments)

    const submitComment = async (formData, onSucces) => {
        const newComment = formData['comment']
        try {
            await logics.posts.createComment(newComment, postId)
            onSucces()
            const user = await logics.users.getUserMainInfo()
            const comment = { author: { avatar: user.avatar, username: user.username, id: user.id }, content: newComment, createdAt: 'just now' }
            const newComments = [...commentsToDisplay, comment]
            setCommentsToDisplay(newComments)
        } catch (error) {
            alert(error)
        }
    }


    useEffect(() => { }, [commentsToDisplay])

    return <div className="w-full flex justify-center flex-col items-center gap-5">
        <ul className="w-full flex flex-col gap-1">
            {commentsToDisplay.length > 0 && commentsToDisplay.map((comment, index) => {
                return <li key={index} className="w-full flex flex-col gap-3 !border !border-gray-100 rounded-sm !p-1 shadow">
                    <div className="w-full flex flex-row justify-start items-center gap-3">
                        <UserAvatar buttonCallback={() => navigate(`/profile/${comment.author.username}`)}
                            size='sm' avatar={comment.author.avatar} letter={comment.author.username[0]} />
                        <span className="font-bold">{comment.author.username}</span>
                    </div>
                    <p className="text-justify !pl-5 w-full">
                        {comment.content}
                    </p>
                    <div className="w-full text-right text-sm !-mt-2">
                        {comment.createdAt}
                    </div>
                </li>
            })}
        </ul>
        <Form inputsArray={[commentFormObject]} submitButtonText={'Send'} onSubmitCallback={submitComment} />
    </div>
}

export default Comments