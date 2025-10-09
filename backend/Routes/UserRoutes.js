import express from "express"
import { getUserDate } from "../controllers/UserControllers.js";


const userRouter = express.Router()

userRouter.get('/data',getUserDate)

export default userRouter;