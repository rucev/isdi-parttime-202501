import { errors } from "common"
import { useEffect, useState } from "react"

const Alert = ({ error, onClose }) => {
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (error instanceof errors.ConnectionError) {
            setMessage('Our servers are down! Try again later')
        } else if (error instanceof errors.ExistenceError || error instanceof errors.DuplicityError) {
            setMessage('Our database is very confuse with what your sending. Check your inputs!')
        } else if (error instanceof TypeError || error instanceof RangeError || error instanceof errors.FormatError || error instanceof errors.ContentError) {
            setMessage('Check the form, your inputs look just weird!')
        } else if (error instanceof errors.AuthError) {
            setMessage('You are not allowed to do that!')
        } else if (error instanceof errors.ServerError) {
            setMessage('Our server had a bit of a break down, please try again')
        } else {
            setMessage('I have no idea what just happen. 😀📎')
        }
    }, [])

    return <div className="z-30 absolute min-h-48 h-fit top-5 left-1/4 md:left-1/3 flex items-start flex-col justify-start w-1/2 md:w-1/3 p-4 text-gray-500 bg-white rounded-lg shadow-sm shadow-amber-600">
        <div className="w-full flex items-center justify-between shrink-0 h-12 text-organge-500 bg-orange-100 rounded-t-lg">
            <i className="bi bi-exclamation-triangle text-3xl"></i>
            <button onClick={onClose} type="button" className="cursor-pointer text-gray-400 hover:text-gray-900 rounded-lg">
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
        <div className="w-full min-h-24 h-fit flex flex-col justify-center items-center text-center">
            <p className="text-lg w-full px-2">{message}</p>
        </div>

    </div>



}

export default Alert