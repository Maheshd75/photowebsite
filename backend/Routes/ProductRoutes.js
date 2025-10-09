import express from "express"
import {upload} from '../configs/multer.js'
import { addProduct, deleteProduct, getProduct, getProducts } from "../controllers/ProductControllers.js";

const productRouter = express.Router();

productRouter.get('/get',getProducts)
productRouter.post('/add',upload.array('images',5),addProduct)
productRouter.post('/delete',deleteProduct)
productRouter.post('/productData',getProduct)

export default productRouter