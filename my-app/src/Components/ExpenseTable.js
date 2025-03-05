/*  import ExpenseItem from "./ExpenseItem"
export default function ExpenseTable({expenses,categories,handleRemoveExpense}){
  let value=expenses.data.map(ele=>ele.amount)
        .reduce((acc,ele)=>{
         return  acc+=ele   
 },0)

     return(
        <div>
            <h2>Expense List-{expenses.data.length}</h2>
            {expenses.data.length>0?(
            <table>
              
                <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Action</th>
        </tr>
        </thead>
           <tbody>
            
               {expenses.data.map((ele)=>{
                  return( <ExpenseItem key={ele._id}
                   id={ele._id}
                    description={ele.description}
                    title={ele.title} 
                    amount ={ele.amount}
                    expenseDate={ele.expenseDate}
                    categories={categories}
                    category={ele.category}
                    handleRemoveExpense={handleRemoveExpense} 
                     
                      />)
               })}
               </tbody>
            </table>):(<p>No expenses available</p>)}
            <br/>
            <h2>Total Expenses - {value}</h2>
        </div>
    )
} 
 */
import ExpenseItem from "./ExpenseItem.js"
import ExpenseContext from "../Context/ExpenseContext.js"
import {useContext} from "react"
 
export default function ExpenseTable(){
    const {expenses} = useContext(ExpenseContext)
   
    return (
        <div>
          <h1>Expense Length-{expenses.data.length}</h1>
          {expenses.data.length>0?(
            <table border={1}>
              
                <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Action</th>
        </tr>
        </thead>
           <tbody>
            
               {expenses.data.map((ele)=>{
                  return( <ExpenseItem key={ele._id}
                                          {...ele}
                /*    id={ele._id}
                    description={ele.description}
                    title={ele.title} 
                    amount ={ele.amount}
                    expenseDate={ele.expenseDate}
                    categories={categories}
                    category={ele.category} */
                  
                      />)
               })}
               </tbody>
            </table>):(<p>No expenses available</p>)}
            <br/>
        
            
        
        </div>
    )
}