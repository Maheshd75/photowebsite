import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    image_urls:[{type:String,required:true}],
    category:{type:String,required:true},
    material:{type:String,required:true},
    sizes:[{type:String,required:true}],
    productType:{type:String,required:true},
    price:{type:String,required:true},
    isSale:{type:String},
    isnew:{type:String}
},{timestamps:true})

const Product = mongoose.model('Product',productSchema)

export default Product