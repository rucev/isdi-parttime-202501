const Landing = () => {
    return <div className="landing__content">
        <h1 className="landing__title">PET APP</h1>
        <Logo size={"lg"} />
        <h2 className="landing__subtitle">A social app for pets</h2>
    </div>
}

const Register = ({ handleNavigateToHome, handleLoginClick }) => {
    const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
    const objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '·········', inputId: 'confirmation-password', isRequired: true }

    const onRegisterUser = (formData) => {
        try {
            registerUser(formData)
            handleNavigateToHome()
        } catch (error) {
            console.error(error)
        }

    }

    return <div className="register">
        <h1>Register</h1>
        <Form inputsArray={[objectEmail, objectPassword, objectConfirmPassword]} submitButtonText={'Register'} onSubmitCallback={onRegisterUser} />
        <div className="register__login">
            <span className="register__login--text">Already have an account?</span>
            <Btn btnClassnames={"register__login--button"} btnContent={'Go to login!'} btnCallback={handleLoginClick} />
        </div>
    </div>

}

const Login = () => {
    return <h1>Login</h1>
}

const Home = () => {
    return <h1>Home</h1>
}