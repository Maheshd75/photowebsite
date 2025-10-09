import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import productRouter from "./Routes/ProductRoutes.js"
import cartRouter from "./Routes/CartRoutes.js"
import { functions, inngest } from "./inngest/index.js"
import {serve} from "inngest/express"
import userRouter from "./Routes/UserRoutes.js"
import orderRouter from "./Routes/OrderRoutes.js"

const app = express()

await connectDB()

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("server running")
})
app.use('/api/inngest',serve({client:inngest,functions}))
app.use('/api/user',userRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})