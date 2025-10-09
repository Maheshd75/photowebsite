import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../api/axios";



const initialState = {
    cartItems:[],
    
};

export const getCartData = createAsyncThunk('cart/getCartData',async()=>{
  const {data} =await api.get('/api/cart/get')
  if(data.success){
    return data
  }else{
    return null
  }
})
export const addToCart = createAsyncThunk('cart/addToCart',async({userId,productId,selectedSize,quantity=1})=>{
  try{
  const {data} = await api.post('/api/cart/add',{userId,productId,selectedSize,quantity})
  if(data.success){
    console.log(data)
  }
  }catch(error){
    console.error(error.message)
  }
})
export const updateCartItem = createAsyncThunk('cart/updateCartItem',async({userId,productId,quantity})=>{
  try {
    const {data} = await api.post('/api/cart/update',{userId,productId,quantity})
    if (data.success){
      console.log(data)
    }
    console.log(data)
  } catch (error) {
    console.log(error.message)
    
  }
})

export const removeCartItem = createAsyncThunk('cart/removeCartItem',async({userId,productId})=>{
  try {
    const {data} = await api.post('/api/cart/remove',{userId,productId})
    if(data.success){
      console.log(data)
    }
  } catch (error) {
    console.log(error.message)
    
  }
})



const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addProduct: (state, action) => {
      
      const {cartItem,selectedSize,quantity = 1} = action.payload
      const size = selectedSize || cartItem.sizes[0];
      const cartItemId = `${cartItem._id}-${size}`;
      console.log(cartItemId)

      const existingProduct = state.cartItems.find(
        item => `${item._id}-${item.selectedSize}` === cartItemId
      )
      if(existingProduct){
        existingProduct.quantity += quantity
      }else{
        state.cartItems.push({...cartItem,quantity,selectedSize:size})
      }

        },
        updateCartQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;

      if (quantity === 0) {
        state.cartItems = state.cartItems.filter(
          item => `${item._id}-${item.selectedSize}` !== cartItemId
        );
        
      } else {
        state.cartItems= state.cartItems.map(item =>
          `${item._id}-${item.selectedSize}` === cartItemId
            ? { ...item, quantity }
            : item
        );
        
      }
    },
        removeFromCart:(state,action) => {
            const { cartItemId } = action.payload;
      const item = state.cartItems.find(
        item => `${item._id}-${item.selectedSize}` === cartItemId
      );
      
      if (item) {
        toast.success(`Removed ${item.name} from cart`);
      }
      state.cartItems= state.cartItems.filter(
        item => `${item._id}-${item.selectedSize}` !== cartItemId
      );
      
    },
    }
})

export const {addProduct,updateCartQuantity,removeFromCart} = cartSlice.actions

export default cartSlice.reducer
