import express from "express"
import { addToCart, getCartData, removeCartItem, updateCartQuantity } from "../controllers/cartControllers.js";
import { protect } from "../middlewares/auth.js";


const cartRouter = express.Router();

cartRouter.get('/get',protect,getCartData)
cartRouter.post('/add',protect,addToCart)
cartRouter.post('/update',protect,updateCartQuantity)
cartRouter.post('/remove',protect,removeCartItem)

export default cartRouter