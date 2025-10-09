import express from "express"
import { addToCart, getCartData, removeCartItem, updateCartQuantity } from "../controllers/cartControllers.js";


const cartRouter = express.Router();

cartRouter.get('/get',getCartData)
cartRouter.post('/add',addToCart)
cartRouter.post('/update',updateCartQuantity)
cartRouter.post('/remove',removeCartItem)

export default cartRouter