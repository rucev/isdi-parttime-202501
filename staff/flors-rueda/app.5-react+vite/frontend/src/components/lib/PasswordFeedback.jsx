const PasswordFeedback = ({ securityPasswordErrors }) => {
    return <div>
        {
            securityPasswordErrors.map((error, index) => {
                return <p key={index}>{error.message}</p>
            })
        }
    </div>
}

export default PasswordFeedback