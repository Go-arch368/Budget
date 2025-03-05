import axios from "axios"
import React, { useEffect } from "react";
import {useReducer} from "react"
import "./styles.css"
import CategoryContainer from "./Components/CategoryContainer";
import ExpenseContainer from "./Components/ExpenseContainer"
import CategoryContext from "./Context/CategoryContext"
import ExpenseContext from "./Context/ExpenseContext"

const expenseInitialState={
  data:[],
  editId:null,
  serverErrors:null
}

const expensesReducer=(state,action)=>{
 switch(action.type){
   case "set_expenses" : {
    return {...state,data:action.payload}
   }
   case "add_expenses":{
    return {...state,data:[...state.data,action.payload]}
   }
   case "delete_expenses":{
    return {...state,
      data:state.data.filter((ele)=>ele._id!==action.payload)}
   }
  case "edit_expenses":{
      return{...state,editId:action.payload}
    }
  case "update_expenses":{
    return{...state,editId:null,data:state.data.map((ele)=>{
        if( ele._id===action.payload._id){
          return action.payload
        }
        else{
          return ele
        }
    })}
  }  
  
   default:{
    return {...state}
   }
 }
}
const categoryInitialState={
  data:[],
  serverErrors:null
}

const categoryReducer=(state,action)=>{
  switch(action.type){
    case "set_category":{
      return {...state,data:action.payload}
    }
    case "add_category":{
      return{...state,data:[...state.data,action.payload]}
    }
    case "remove_category":{
      return{...state,data:state.data.filter((ele)=>ele._id!==action.payload)}
    }
 
    default :{
      return {...state}
    }
  }
}
function App() {

  // const[categories,setCategories]=useState([])
  const [categories,categoryDispatch]=useReducer(categoryReducer,categoryInitialState)
  const [expenses,expensesDispatch]=useReducer(expensesReducer,expenseInitialState)
  // const [expenses,setExpenses]=useState([])
//categories

  useEffect(()=>{

      axios.get('http://localhost:3999/categories')
    .then((response)=>{
      const result=response.data;
      categoryDispatch({type:"set_category",payload:result})
    })
   .catch((err)=>{
    console.log(err.message)
   })    
  },[])
    
 

  
  //expense

  useEffect(()=>{

   axios.get('http://localhost:3999/expenses')
  .then((response)=>{
    const result=response.data;
    expensesDispatch({type:"set_expenses",payload:result})
  })
 .catch((err)=>{
  console.log(err.message)
 })    
},[])
  


  return (
    <div className="App">
        <h1>Expense App</h1>
     

       

         <CategoryContext.Provider value={{categories,categoryDispatch,expensesDispatch,expenses}}>
                 <CategoryContainer/>
         </CategoryContext.Provider>
         <br/><hr/><br/>
         <h2>Working on expenses</h2>
       
      
       <ExpenseContext.Provider value={{expenses,categories,expensesDispatch}}>
       <ExpenseContainer/>
       </ExpenseContext.Provider>
      
        
    </div>
  );
}

export default App;
