

import { useContext,useMemo } from "react"
import ExpenseForm from "./ExpenseForm"
import ExpenseTable from "./ExpenseTable"
import ExpenseContext from "../Context/ExpenseContext"


export default function ExpenseContainer(){
 
   const {expenses}=useContext(ExpenseContext)
   const expenseSum=useMemo(()=>{
         return expenses.data.reduce((acc,cv)=>{
            console.log("calculating")
            return acc+cv.amount
         },0)
   },[expenses.data])
  return(
    <div>
      
      <ExpenseForm />
      <ExpenseTable />
    <h2>Total-{expenseSum}</h2>
    </div>
  )
}