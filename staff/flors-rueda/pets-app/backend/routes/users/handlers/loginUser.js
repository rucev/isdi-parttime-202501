import { validator } from "common"
import logic from "../../../logic/index.js"
import * as jose from 'jose'
import 'dotenv/config'

const loginUser = (req, res, next) => {
    const { email, password } = req.body
    try {
        validator.email(email)
        validator.password(password)
        return logic.loginUser(email, password)
            .then((id) => {
                const codedId = jose.base64url.decode(id)

                return new jose.EncryptJWT(process.env.JWT_SECRET)
                    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
                    .setIssuedAt()
                    .setExpirationTime('24h')
                    .encrypt(codedId)
                    .then(token => res.status(200).send({ token }))
            })
            .catch((error) => next(error))
    } catch (error) {
        next(error)
    }
}

export default loginUser