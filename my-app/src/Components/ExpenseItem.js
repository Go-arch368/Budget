import axios from "axios"
import { useContext } from "react"

import ExpenseContext from "../Context/ExpenseContext"
export default function ExpenseItem({_id,title,expenseDate,amount,category}){
      const {expensesDispatch,categories} =useContext(ExpenseContext)
    const date=new Date(expenseDate)
    const formattedDate=date.toLocaleString()

   async function removebyId(){
        const sure=window.confirm("Are your sure?")
       try{
        if(sure){
            const response= await axios.delete(`http://localhost:3999/expenses/${_id}`)
            const result=response.data
            expensesDispatch({type:'delete_expenses',payload:result._id})
        }
       }
       catch(err){
           console.log(err)
       }
   }
    
   function handleEdit(){
      expensesDispatch({type:"edit_expenses",payload:_id})
  }
    return(
      
                                                
        <tr>
            <td>{formattedDate}</td>
            <td>{amount}</td>
            {categories.data.map((ele) => {
    return ele._id === category ? (
        <td key={ele._id}>{ele.name}</td>
    ) : null;
})}

    <td>
    <button onClick={handleEdit}>Edit</button>
    <button onClick={removebyId}>remove</button></td>
  </tr>  

    )
   }