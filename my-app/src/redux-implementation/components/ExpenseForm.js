import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addExpenses,update } from '../slices/expenses-slice'
import {format} from "date-fns"
export default function ExpenseForm(){
    const initialState ={
        expenseDate:"",
        title:"",
        amount:"",
        category:"",
        description:''
    }
    const [form,setForm] = useState(initialState)
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

    
    const {serverErrors,editId,data} = useSelector((state)=>state.expenses)
    const dispatch = useDispatch()

    function resetForm(){
       setForm(initialState)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        clientValidations()
        if(Object.keys(errors).length!==0){
            setClientErrors(errors)
        }
        else{
            setClientErrors({})
            if(editId){
              dispatch(update({form,editId,resetForm}))
            }
            else{
              dispatch(addExpenses({form,resetForm}))
            }
            
        }
    }



    useEffect(()=>{
        if(editId){
           const expenses = data.find((ele)=>ele._id==editId)
           const date = format(new Date(expenses.expenseDate),"yyyy-MM-dd")
           setForm({
            expenseDate:date,
            title:expenses.title,
            amount:expenses.amount,
            category:expenses.category,
            description:expenses.description
           })
           
        }
    },[editId])

    return(
        <div>
            <h1>Expense Form</h1>
            {console.log(serverErrors)}
         

           <form onSubmit={handleSubmit}>
            <h1>{editId?"edit":"add"}category</h1>
         <label>Date</label>
         <input type="date" value={form.expenseDate} onChange={(e)=>{setForm({...form,expenseDate:e.target.value})}}/>
           {clientErrors.expenseDate&&<span style={{color:"red"}}>{clientErrors.expenseDate}</span>}
         <br/>
         {serverErrors&&serverErrors.filter((ele)=>ele.path==="date").map((ele)=><p style={{color:"red"}}>{ele.msg}</p>)}<br/>
         <label>Enter title</label>
         <input type="text " value={form.title} onChange={(e)=>{setForm({...form,title:e.target.value})}}/>
         {clientErrors.title&&<span style={{color:"red"}}>{clientErrors.title}</span>}<br/>
         {serverErrors&&serverErrors.filter((ele)=>ele.path==="title").map((ele)=><p style={{color:"red"}}>{ele.msg}</p>)}
         <br/>
         <label>amount</label>
         <input type="text" value={form.amount} onChange={(e)=>{setForm({...form,amount:e.target.value})}}/>
          {clientErrors.amount&&<span style={{color:"red"}}>{clientErrors.amount}</span>} <br/>
          {serverErrors&&serverErrors.filter((ele)=>ele.path==="amount").map((ele)=><p style={{color:"red"}}>{ele.msg}</p>)}
         <br/>
         <label>select category</label>
         <select onChange={(e)=>{setForm({...form,category:e.target.value})}}>
            <option value="select category">select</option>
            {data.map((ele)=>{
                return <option value={ele._id} key={ele.name}>{ele.name}</option>
            })}
         </select>
         {clientErrors.category&&<span style={{color:"red"}}>{clientErrors.category}</span>}
         {serverErrors&&serverErrors.filter((ele)=>ele.path==="category").map((ele)=><p style={{color:"red"}}>{ele.msg}</p>)}
        <br/>
        <label>Description</label>
        <textarea value={form.description} onChange={(e)=>{setForm({...form,description:e.target.value})}}></textarea><br/>
        {serverErrors&&serverErrors.filter((ele)=>ele.path==="description").map((ele)=><p style={{color:"red"}}>{ele.msg}</p>)}
         <br/>
         <input type="submit"/>
      </form>
        </div>
    )
}