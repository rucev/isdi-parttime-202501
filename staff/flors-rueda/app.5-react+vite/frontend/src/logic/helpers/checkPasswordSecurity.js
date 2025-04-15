import validator from "../../utils/validators"

const checkPasswordSecurity = (password) => {
    return validator.passwordSecurity(password)
}

export default checkPasswordSecurity