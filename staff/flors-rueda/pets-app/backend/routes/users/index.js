import { json, Router } from "express";
import handlers from "./handlers/index.js";
import extractId from "../../middlewares/extractId.js";


const jsonBodyParser = json()
const userRouter = Router()

userRouter.post('/', jsonBodyParser, handlers.registerUser)
userRouter.post('/auth', jsonBodyParser, handlers.loginUser)

userRouter.get('/username', jsonBodyParser, extractId, handlers.getUsername)

userRouter.patch('/username', jsonBodyParser, extractId, handlers.updateUsername)

export default userRouter