import express from "express"
import { getAllOrders, order, ordersData } from "../controllers/OrderControllers.js"
import {protect}  from '../middlewares/auth.js'

const orderRouter = express.Router()

orderRouter.get('/ordersdata',protect,ordersData)
orderRouter.post('/cod',protect,order)
orderRouter.get('/allorders',getAllOrders)


export default orderRouter