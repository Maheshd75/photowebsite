import imagekit from "../configs/imageKit.js"
import Product from "../models/Product.js"
import fs from 'fs'

export const getProduct = async(req,res) =>{
    try {
        const {productId} = req.body
        const product = await Product.findById(productId)
        if(!product){
            return res.json({success:false,message:"Product not found"})
        }
        res.json({success:true,product})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

export const getProducts = async (req,res) =>{
    try {
        const products = await Product.find()
        res.json({success:true,products})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}
export const addProduct = async (req,res) => {
    try {
        const {name,category,material,productType,sizes,price} = req.body
        const images = req.files
        let image_urls = [];
        if(images.length){
            image_urls = await Promise.all(
                images.map(async(image)=>{
                    const fileBuffer = fs.readFileSync(image.path);
                    const response = await imagekit.upload({
                        file:fileBuffer,
                        fileName:image.originalname,
                        folder:"posts"
                    })
                    const url = imagekit.url({
                        path:response.filePath,
                        transformation:[
                            {quality:"auto"},
                            {format:"webp"},
                            {width:'1280'}
                            
                        ]
                    })
                    return url;
                })
            )
        }
        await Product.create({
            name,
            image_urls,
            category,
            material,
            sizes,
            productType,
            price

        })
        res.json({success:true,message:"product added successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

const updateProduct = async(req,res) => {
    const {id} = req.body

}
export const deleteProduct = async (req,res) =>{
    try {
         const {id} = req.body
          await Product.findByIdAndDelete(id)
         res.json({success:true,message:"product removed successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
   
}