import { useState } from 'react'
import './MyProfileSettings.css'
import logics from '../../logic'
import Form from '../../components/lib/Form'

const Settings = () => {
    const [showNewEmailForm, setShowNewEmailForm] = useState(false)
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false)
    const [showDeleteAccountForm, setShowDeleteAccountForm] = useState(false)

    const emailObject = { label: 'Email', inputType: 'email', inputPlaceholder: 'my_new@email.com', inputId: 'email', isRequired: true }

    const oldPasswordObject = { label: 'Enter your current password', inputType: 'password', inputPlaceholder: '·········', inputId: 'old-password', isRequired: true }
    const newPasswordObject = { label: 'New password', inputType: 'password', inputPlaceholder: '·········', inputId: 'new-password', isRequired: true }
    const newPasswordConfirmObject = { label: 'Confirm your new password', inputType: 'password', inputPlaceholder: '·········', inputId: 'confirm-password', isRequired: true }

    const onUpdateEmail = (formData) => {
        const newEmail = formData.email

        try {
            logics.users.updateEmail(newEmail)
        } catch (error) {
            alert('ups! try again!')
            console.error(error)
        }
    }

    const onUpdatePassword = (formData) => {
        const oldPassword = formData['old-password']
        const newPassword = formData['new-password']
        const confirmPassword = formData['confirm-password']

        try {
            logics.users.updatePassword(newPassword, confirmPassword, oldPassword)
        } catch (error) {
            alert('ups! try again!')
            console.error(error)
        }
    }

    return <div className='main-container'>
        <div className='settings__section-title' onClick={() => setShowNewEmailForm(!showNewEmailForm)}>
            <h2>Update my email</h2>
            <i className={`bi bi-chevron-compact-${showNewEmailForm ? 'up' : 'down'}`}></i>
        </div>
        {
            showNewEmailForm && <Form
                inputsArray={[emailObject]}
                submitButtonText={'Save new email'}
                onSubmitCallback={onUpdateEmail}
            />
        }
        <div className='settings__section-title' onClick={() => setShowNewPasswordForm(!showNewPasswordForm)}>
            <h2>Update my password</h2>
            <i className={`bi bi-chevron-compact-${showNewPasswordForm ? 'up' : 'down'}`}></i>
        </div>
        {
            showNewPasswordForm && <Form
                inputsArray={[oldPasswordObject, newPasswordObject, newPasswordConfirmObject]}
                submitButtonText={'Save new password'}
                onSubmitCallback={onUpdatePassword}
            />
        }
        <div className='settings__section-title' onClick={() => setShowDeleteAccountForm(!showDeleteAccountForm)}>
            <h2>Delete my account</h2>
            <i className={`bi bi-chevron-compact-${showDeleteAccountForm ? 'up' : 'down'}`}></i>
        </div>
        {
            showDeleteAccountForm && <h2>aqui va un form</h2>
        }
    </div>
}

export default Settings