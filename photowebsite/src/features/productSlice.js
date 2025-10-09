import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/axios"

const initialState = {
    products:[],

}
export const getProductsData = createAsyncThunk('products/getProductsData',async()=>{
    const {data} = await api.get('/api/products/get')
    if(data.success){
        return data.products
    }else{
        return null
    }
})


const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getProductsData.fulfilled,(state,action)=>{
            state.products = action.payload
            
        })
    }

})

export default productsSlice.reducer