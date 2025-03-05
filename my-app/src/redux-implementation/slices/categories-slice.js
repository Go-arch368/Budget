import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../Config/axios"


export const fetchCategories = createAsyncThunk("categories/fetchCategories",async()=>{
    const response = await axios.get("/api/categories")
    return response.data
})

export const removeCategory = createAsyncThunk("categoreis/removeCategory",async(id)=>{
    const response = await axios.delete(`/api/remove-category/${id}`)
    return response.data
})

export const addCategory = createAsyncThunk("categories/addCategory",async({formData,resetForm},{rejectWithValue})=>{
    try{
       const response = await axios.post("/api/create-category",formData)
       resetForm()
       return response.data
    }
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.error)
    }
})

export const updateCategory =createAsyncThunk("categories/updateCategory",async({formData,editId,resetForm},{rejectWithValue})=>{
    try{
        const response = await axios.put(`/api/update-category/${editId}`,formData)
        
        resetForm()
        console.log(response.data)
        return response.data
    }
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.error)
    }
})

const categoriesSlice = createSlice({
    name:"categories",
    initialState:{
        data:[],
        serverErrors:null,
        editId:null
    },
    reducers:{
        assignEditId:(state,action)=>{
            state.editId = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            state.data= action.payload
        })
        builder.addCase(removeCategory.fulfilled,(state,action)=>{
            const index = state.data.findIndex((ele)=>ele._id===action.payload._id)
            state.data.splice(index,1)
        })
        builder.addCase(addCategory.fulfilled,(state,action)=>{
            state.data.push(action.payload)
            state.serverErrors=null
        })
        builder.addCase(addCategory.rejected,(state,action)=>{
            state.serverErrors = action.payload
        })
        builder.addCase(updateCategory.fulfilled,(state,action)=>{
            const index = state.data.findIndex((ele)=>ele._id===action.payload._id)
            state.data[index]=action.payload
            state.editId=null
            //return {...state,data:state.data.map((ele)=>ele._id==action.payload._id?{action.payload}:ele)}
        })
        builder.addCase(updateCategory.rejected,(state,action)=>{
            state.serverErrors=action.payload
            state.data=[]
        })
    }
})
export const {assignEditId}  =categoriesSlice.actions
export default categoriesSlice.reducer