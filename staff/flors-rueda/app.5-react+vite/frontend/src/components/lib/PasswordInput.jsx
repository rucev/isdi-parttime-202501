import { useState } from "react"
import Btn from "./Btn"

const PasswordInput = ({ inputElement, onChangeCallback }) => {
    const [showPassword, setShowPassword] = useState(false)

    const onShowClick = (event) => {
        //event.preventDefeault()
        setShowPassword(!showPassword)
    }

    return <div className="form__input--password">
        <input onChange={onChangeCallback ? (event) => onChangeCallback(event) : null}
            className="form__input-text" required={inputElement.isRequired} placeholder={inputElement.inputPlaceholder}
            id={inputElement.inputId}
            type={showPassword ? 'text' : 'password'}
        />
        <Btn
            btnCallback={(event) => onShowClick(event)}
            btnContent={showPassword ? <i className="bi bi-eye-slash-fill" /> : <i className="bi bi-eye-fill" />}
            btnClassnames={'form__password-button'}
        />
    </div>
}

export default PasswordInput