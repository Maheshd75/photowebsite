import express from "express"
import { order } from "../controllers/OrderControllers.js"

const orderRouter = express.Router()

orderRouter.post('/order',order)

export default orderRouter