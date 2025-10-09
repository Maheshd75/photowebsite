import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  //  userId:{type:String,ref:"User"},
    items:[{
        productId:{type:String,required:true,ref:"Product"},
        selectedSize:{type:String,reuired:true},
        quantity:{type:String,required:true},

    }],
    totalAmount:{type:String,required:true},
    paymentType:{type:String,enum:['cod','stripe','razorpay'],default:'cod'},
    paymentstatus:{type:String,enum:['unpaid','pending','paid'],default:'unpaid'},
    shippingAddress:{type:String},
    orderNumber:{type:String},
    trackingNumber:{type:String},
    status:{type:String,enum:['pending','shipped','delivered'],default:'pending'},
    createdAt:{type:Date,default:Date.now}
})

const Orders = mongoose.model("Orders",orderSchema)

export default Orders