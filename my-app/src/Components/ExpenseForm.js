import axios from "axios"
import {format} from "date-fns"
import {useState,useContext,useEffect} from "react"

import ExpenseContext from "../Context/ExpenseContext"
export default function ExpenseForm(){
   const {categories,expensesDispatch,expenses}=useContext(ExpenseContext)
   console.log(categories)
   const formInitialValue={
    expenseDate: "",
    title: "",
    amount: "",
    category: "",
    description: ""
   }
  const [form,setForm]=useState(formInitialValue)
  const [clientErrors,setClientErrors]=useState({})
  const errors={}

  const clientValidations=()=>{
    if(form.expenseDate.length===0){
      errors.expenseDate="the date should not be zero"
    }
    else if (new Date(form.expenseDate)>=new Date()){
      errors.expenseDate="the date should not be greater than today"
    }

    if(form.title.trim().length===0){
      errors.title="the title should not be empty"
    }

    if(form.amount.trim().length<0){
      errors.amount="amount cannot be empty"
    }
    else if(form.amount.trim()<1){
      errors.amount="amount should be atleast 1rs"
    }

    if(form.category.trim().length===0){
      errors.category="category should not be selected"
    }
    
  }

async function handleSubmit(e){
    e.preventDefault()

    clientValidations()

   if(Object.keys(errors).length!==0){
      setClientErrors(errors)
   }
   else{
    setClientErrors({})
    
    if(expenses.editId){
      try{
        const response=await axios.put(`http://localhost:3999/expenses/${expenses.editId}`,form)
        const result=response.data
        alert("expense updated")
        expensesDispatch({type:"update_expenses",payload:result})
        setForm(formInitialValue)
      }
      catch(err){
        console.log(err)
      }
    }
    else{
      try{
        const response= await axios.post("http://localhost:3999/expenses",form)
        const result=response.data
        expensesDispatch({type:"add_expenses",payload:result})
        }
        catch(err){
          console.log(err)
        }
    }
  
   }
  }
   useEffect(()=>{
    if(expenses.editId){
      const value=expenses.data.find((ele)=>ele._id===expenses.editId)
      const dateChange=format(new Date(value.expenseDate),"yyyy-MM-dd")
      setForm({
        expenseDate:dateChange,
        title:value.title,
        amount:value.amount.toString(),
        category:value.category
      })
    }
   },[expenses.editId,expenses.data])


  return (
    <div>
      <h2>{expenses.editId?"edit":"Add"} category</h2>
      <h2>Listing Expenses -{expenses.data.length}</h2>
      <form onSubmit={handleSubmit}>
         <label>Date</label>
         <input type="date" value={form.expenseDate} onChange={(e)=>{setForm({...form,expenseDate:e.target.value})}}/>
          {clientErrors.expenseDate&&<span style={{color:"red"}}>{clientErrors.expenseDate}</span>}
         <br/>
         <label>Enter title</label>
         <input type="text " value={form.title} onChange={(e)=>{setForm({...form,title:e.target.value})}}/>
         {clientErrors.title&&<span style={{color:"red"}}>{clientErrors.title}</span>}
         <br/>
         <label>amount</label>
         <input type="text" value={form.amount} onChange={(e)=>{setForm({...form,amount:e.target.value})}}/>
         {clientErrors.amount&&<span style={{color:"red"}}>{clientErrors.amount}</span>}
         <br/>
         <label>select category</label>
         <select value={form.category} onChange={(e)=>{setForm({...form,category:e.target.value})}}>
            <option value="">select</option>
            {categories.data.map((ele)=>{
              return <option value={ele._id} key={ele._id}>{ele.name}</option>
            })}
        </select>
        {clientErrors.category&&<span style={{color:"red"}}>{clientErrors.category}</span>}
        <br/>
        <label>Description</label>
        <textarea value={form.description} onChange={(e)=>{setForm({...form,description:e.target.value})}}></textarea>
         <br/>
         <input type="submit"/>
      </form>
    </div>
  )
}