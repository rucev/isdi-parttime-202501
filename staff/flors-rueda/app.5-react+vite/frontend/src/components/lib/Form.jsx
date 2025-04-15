import { useEffect, useState } from 'react'
import './Form.css'
import PasswordFeedback from './PasswordFeedback'
import Btn from './Btn'
import PasswordInput from './PasswordInput'

const Form = ({ inputsArray, onSubmitCallback, submitButtonText, onFileChangeCallback, onPasswordChangeCallback, securityPasswordErrors }) => { //inputsArray = [{label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email'}, {label: 'Password....}]
    const [tempPassword, setTempPassword] = useState()
    const [arePasswordsEqual, setArePasswordsEqual] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false)

    const handleFileInputChange = (event) => {
        event.preventDefault()

        if (onFileChangeCallback) {
            let img;
            if (!event.target.files) return onFileChangeCallback(event.target.value, false)

            img = event.target.files[0];

            const image = new FileReader();
            image.onloadend = () => {
                const base64 = image.result;
                onFileChangeCallback(base64, true);
            };
            image.readAsDataURL(img)
        }
    }

    const handlePasswordInputChange = (event) => {
        event.preventDefault()

        const password = event.target.value

        if (onPasswordChangeCallback) {
            setTempPassword(password)
            onPasswordChangeCallback(password)
        }
    }

    const handleConfirmationPasswordInputChange = (event) => {
        event.preventDefault()

        const confirmationPassword = event.target.value

        if (onPasswordChangeCallback) setArePasswordsEqual(confirmationPassword === tempPassword)
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target; // --> elemento form html al que le hemos dado submit
        const formData = {}; // {email: esto, password: esto-otro}

        //iterar todos los inputs que he generado en el formulario, de esos inputs quiero acceder al valor que ha escrito el usuario
        for (let i = 0; i < inputsArray.length; i++) {
            const fieldName = inputsArray[i].inputId;
            let value;
            if (inputsArray[i].inputType === 'checkbox') {
                value = form[inputsArray[i].inputId].checked
            } else if (inputsArray[i].inputType === 'file') {
                value = form[inputsArray[i].inputId].files[0]
            } else {
                value = form[inputsArray[i].inputId].value
            }

            formData[fieldName] = value; //formData = {'email': 'patata@mail.com'}
        }

        try {
            onSubmitCallback(formData)
            form.reset()
        } catch (error) {
            console.error(error)
            if (error.name === 'FormatError' || error.name === 'RangeError' || error.name === 'TypeError') {
                alert('incorrect inputs, check your form data again')
            }
        }
    }

    return <form className="form" onSubmit={handleSubmit} >
        {
            inputsArray.map((inputElement, index) => {
                if (inputElement.inputType === 'checkbox') {
                    return <fieldset key={index}>
                        <input className="form__input-checkbox" type={inputElement.inputType} id={inputElement.inputId} required={inputElement.isRequired} value={inputElement.value} />
                        <label htmlFor={inputElement.inputId}>{inputElement.label}</label>
                    </fieldset>
                } else if (inputElement.inputType === 'text-area') {
                    return <div className="form__input" key={index}>
                        <label htmlFor={inputElement.inputId}>{inputElement.label}</label>
                        <textarea className="form__input-text" id={inputElement.inputId} required={inputElement.isRequired} placeholder={inputElement.inputPlaceholder} />
                    </div>
                } else if (inputElement.inputType === 'url' || inputElement.inputType === 'file') {
                    return <div className="form__input" key={index} >
                        <label htmlFor={inputElement.inputId}>{inputElement.label}</label>
                        <input onChange={(event) => handleFileInputChange(event)} className="form__input-text"
                            id={inputElement.inputId} required={inputElement.isRequired} type={inputElement.inputType} placeholder={inputElement.inputPlaceholder} />
                    </div>
                } else if (inputElement.inputType === 'password') {
                    return <div className="form__input" key={index} >
                        <label htmlFor={inputElement.inputId}>{inputElement.label}</label>
                        <PasswordInput inputElement={inputElement}
                            onChangeCallback={inputElement.inputId === 'password' ? handlePasswordInputChange : inputElement.inputId === 'confirmation-password' ? handleConfirmationPasswordInputChange : null} />

                    </div>
                } else {
                    return <div className="form__input" key={index} >
                        <label htmlFor={inputElement.inputId}>{inputElement.label}</label>
                        <input className="form__input-text" id={inputElement.inputId} required={inputElement.isRequired} type={inputElement.inputType} placeholder={inputElement.inputPlaceholder} />
                    </div>
                }
            })
        }
        {(securityPasswordErrors) && <PasswordFeedback securityPasswordErrors={securityPasswordErrors} arePasswordsEqual={arePasswordsEqual} />}
        <input className="form__submit-button" type="submit" value={submitButtonText} />
    </form>
}

export default Form

/**
 * id === pswr? showPswrd ? text : password
 * : showConfir ? text : password
 * 
 *  
 * 
 * 
 */