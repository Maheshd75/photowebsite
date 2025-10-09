import Orders from "../models/Order.js"


export const order = async(req,res) => {
    try {
        const {cartItems,totalAmount } = req.body
        const order = await Orders({items:cartItems,totalAmount})
        res.json({success:true,order})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}