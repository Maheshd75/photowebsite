import Orders from "../models/Order.js"

export const ordersData = async(req,res)=>{
    try {
        const {userId} = req.auth()
        const orders = await Orders.find({userId}).populate('items.productId')
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}
export const getAllOrders = async(req,res)=>{
    try {
        const allorders = await Orders.find().populate('items.productId')
        res.json({success:true,allorders})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
export const order = async(req,res) => {
    try {
        const {userId} = req.auth()
        const {orders,totalAmount,addressData } = req.body
        const order = {
            userId:userId,
            items:orders,
            totalAmount:totalAmount,
            shippingAddress:addressData,
            paymentType:'cod',

        }
        const orderdata= await Orders.create(order)
        
        res.json({success:true,orderdata})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}