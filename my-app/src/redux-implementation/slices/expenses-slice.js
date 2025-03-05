import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../Config/axios"

export const fetchExpenses = createAsyncThunk("expenses/fetchExpenses",async()=>{
    const response = await axios.get("/api/expenses")
    console.log(response.data)
    return response.data
})

export const removeExpenses = createAsyncThunk("expenses/removeExpenses",async(id)=>{
    const response = await axios.delete(`/api/expenses/${id}`)
    return response.data
})

export const addExpenses = createAsyncThunk("expenses/addExpenses",async({form,resetForm},{rejectWithValue})=>{
    try{
        const response =await axios.post("/api/expenses",form)
        resetForm()
        console.log(response.data)
        return response.data
        
    }
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.error)//msg
    }
})

export const update = createAsyncThunk("expenses/update",async({form,editId,resetForm},{rejectWithValue})=>{
     try{
        const response = await axios.put(`/api/expenses/${editId}`,form)
        resetForm()
        return response.data
     }
     catch(err){
         console.log(err)
         return rejectWithValue(err.response.data.error)
     }
})

const expensesSlice = createSlice({
    name:"expenses",
    initialState:{
        data:[],
        serverErrors:null,
        editId:null
    },
    reducers:{
       updateExpenses:(state,action)=>{
          state.editId=action.payload
       }
    },
    extraReducers:(builder)=>{
      builder.addCase(fetchExpenses.fulfilled,(state,action)=>{
        state.data=action.payload
      })
      builder.addCase(removeExpenses.fulfilled,(state,action)=>{
        const index = state.data.findIndex((ele)=>ele._id==action.payload._id)
        state.data.splice(index,1)
      })
      builder.addCase(addExpenses.fulfilled,(state,action)=>{
         state.data.push(action.payload)
         state.serverErrors=""
      })
      builder.addCase(addExpenses.rejected,(state,action)=>{
        state.serverErrors = action.payload
      })
      builder.addCase(update.fulfilled,(state,action)=>{
        const index=state.data.findIndex((ele)=>ele._id===action.payload._id)
        state.data[index] = action.payload
        state.editId=null
      })
      builder.addCase(update.rejected,(state,action)=>{
        state.serverErrors=action.payload
         state.data=[]
      })
    }
    
})

export const {updateExpenses} = expensesSlice.actions
export default expensesSlice.reducer