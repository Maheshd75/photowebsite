import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../api/axios";



const initialState = {
    cartItems:[],
    
};

export const getCartData = createAsyncThunk('cart/getCartData',async(token)=>{
  
  try{
  const {data} =await api.get('/api/cart/get',{
    headers:{Authorization:`Bearer ${token}`}
  })
  
  if(data.success){
    console.log(data.cartItems)
    
    return data.cartItems
  }else{
    console.log(data)
    //return null
  }
}catch(error){
    console.log(error.message)
  }
})
export const addToCart = createAsyncThunk('cart/addToCart',async({productId,selectedSize,quantity,token})=>{
  try{
  const {data} = await api.post('/api/cart/add',{productId,selectedSize,quantity},{
    headers:{Authorization:`Bearer ${token}`}
  })
  if(data.success){
    console.log(data)
    
  }
  }catch(error){
    console.error(error.message)
  } 
})
export const updateCartItem = createAsyncThunk('cart/updateCartItem',async({productId,selectedSize,quantity,token})=>{
  try {
    
    const {data} = await api.post('/api/cart/update',{productId,selectedSize,quantity},{
      headers:{Authorization:`Bearer ${token}`}
    })
    if (data.success){
      console.log(data)
      return data.items
    }
    console.log(data)
  } catch (error) {
    console.log(error.message)
    
  } 
})

export const removeCartItem = createAsyncThunk('cart/removeCartItem',async({productId,token})=>{
  try {
    const {data} = await api.post('/api/cart/remove',{productId,token},{
      headers:{Authorization:`Bearer ${token}` }
    })
    if(data.success){
      console.log(data)
      return data.items
      
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
    },
    extraReducers:(builder)=>{
      builder.addCase(getCartData.fulfilled,(state,action)=>{
        state.cartItems=action.payload
      }),
      builder.addCase(addToCart.fulfilled,(state,action)=>{
        state.cartItems=action.payload
      }),
      builder.addCase(updateCartItem.fulfilled,(state,action)=>{
        state.cartItems=action.payload
      })
      builder.addCase(removeCartItem.fulfilled,(state,action)=>{
        state.cartItems= action.payload
      })

    }
})

export const {addProduct,updateCartQuantity,removeFromCart} = cartSlice.actions

export default cartSlice.reducer
