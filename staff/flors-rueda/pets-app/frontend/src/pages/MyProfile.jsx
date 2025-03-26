import Form from "../components/lib/Form"
import logics from "../logic/index"

const MyProfile = () => {
    const usernameObject = { label: 'Username', inputType: 'text', inputPlaceholder: 'myNewUserName', inputId: 'username', isRequired: true }

    const onUpdateUsername = (formData) => {
        try {
            logics.users.updateUsername(formData['username'])
        } catch (error) {
            console.error(error)
        }
    }

    return <div className="account">
        <h2>Change my username</h2>
        <Form inputsArray={[usernameObject]} onSubmitCallback={onUpdateUsername} submitButtonText={"Save new username"} />
    </div>
}

export default MyProfile