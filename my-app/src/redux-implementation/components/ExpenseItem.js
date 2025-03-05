import { useSelector,useDispatch } from "react-redux"
import { updateExpenses } from "../slices/expenses-slice"
import { removeExpenses } from "../slices/expenses-slice"
import {format} from 'date-fns'


export default function ExpenseItem({_id,amount,expenseDate,title,category}){
   const dispatch = useDispatch()
   function handleClick(){
      const confirm = window.confirm("Are your sure?")
      if(confirm){
         dispatch(removeExpenses(_id))
      }
   }

   function handleEdit(){
      dispatch(updateExpenses(_id))
   }

   const {data} = useSelector((state)=>state.categories)
   const dateChange = format(new Date(expenseDate),"yyyy-MM-dd")
    return (
        
            <tr>
                    <td>{dateChange}</td>
                    <td>{title}</td>
                    {data.map((ele)=>{
                        return ele._id==category?(<td>{ele.name}</td>):null
                    })}
                    <td>{amount}</td>
                    <td><button onClick={handleEdit}>Edit</button><button onClick={handleClick}>delete</button></td>
                 </tr>
        
    )
}

