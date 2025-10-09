import mongoose  from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{type:String,required:true,ref:"User"},
    productId:{type:String,required:true,ref:"Product"},
    selectedSize:{type:String,required:true},
    quantity:{type:String,required:true},
    addedAt:{type:Date,default:Date.now}
    

})

const Cart = mongoose.model("Cart",cartSchema)

export default Cart