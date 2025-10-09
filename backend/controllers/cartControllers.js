import Cart from "../models/Cart.js";

export const getCartData = async(req,res)=>{
    try {
        const cartItems = await Cart.find()
        if(!cartItems){
            return res.json({success:false,message:"Cart is empty"})
        }
        res.json({success:true,cartItems})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}
export const addToCart = async(req,res) =>{
try {
    const {userId,productId,selectedSize,quantity} = req.body;
    const cartItemId = `${productId}-${selectedSize}`;
    const existingItem = await Cart.findOne({userId,productId,selectedSize})

    if(existingItem){
        existingItem.quantity += quantity;
        await existingItem.save()
        return res.json({success:true,message:"Cart item updated"})
    }

    const newItem = new Cart({userId,productId,selectedSize,quantity});
    await newItem.save()
    res.json({success:true,message:"Cart item added"})

    
        
    } catch (error) {
        res.json({success:true,message:error.message})
        
    }
}

export const updateCartQuantity = async(req,res) =>{
    try {
         const { userId, productId, selectedSize, quantity } = req.body;
    const item = await CartItem.findOne({ userId, productId, selectedSize });
    if (!item){
         return res.status(404).json({success:true, message: 'Item not found' });
    }
    if(quantity === 0){
        await item.deleteOne();
        return res.json({success:true,message:'Cart item removed'})
    }

    item.quantity = quantity;
    await item.save();

    res.status(200).json({success:true, message: 'Quantity updated' });
  } catch (error) {
    res.status(500).json({ success:false,message:"Failed to updated cart item" });
  }
    
}
export const removeCartItem = async (req,res) =>{
    try {
        const {userId,productId,selectedSize} = req.body;
        const deletedItem = await Cart.findOneAndDelete({
            userId,
            productId,
            selectedSize
        })
        if(!deletedItem){
            return res.json({success:false,message:"Cart item not found"})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}