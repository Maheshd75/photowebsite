import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/axios"


const initialState = {
    orders:[]
}

export const order = createAsyncThunk('order/order',async({cartItems,totalAmount})=>{
    console.log(cartItems,totalAmount)
    const {data} = await api.post('api/order/order',{cartItems,totalAmount})
    console.log(data)
})

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{

    }
})

export default orderSlice.reducer