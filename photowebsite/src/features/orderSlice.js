import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/axios"


const initialState = {
    orders:[]
}

export const getOrdersData = createAsyncThunk('order/order',async(token)=>{
    try{
    const {data} = await api.get('api/order/ordersdata',{
        headers:{Authorization:`Bearer ${token}`}
    })
    if(data.success){
        console.log(data.orders)
        return data.orders
    }
}catch(error){
    console.log(error.message)
}
})

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getOrdersData.fulfilled,(state,action)=>{
            state.orders=action.payload
        })
    }
})

export default orderSlice.reducer