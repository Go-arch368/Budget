import { useDispatch,useSelector } from "react-redux"
import ExpenseItem from "./ExpenseItem"

export default function ExpenseList(){
    const {data} = useSelector((state)=>state.expenses)
    
    return(
       <div>
    
           <table border={1}>
              <thead>
                 <tr>
                    <th>expneseDate</th>
                    <th>title</th>
                    <th>category</th>
                    <th>amount</th>
                    <th>actions</th>
                 </tr>
              </thead>
              <tbody>
                    {data.map(ele=>{
                        return <ExpenseItem {...ele}/>
                    })}
              </tbody>
           </table>
           {console.log(data)}
       </div>
       
    )
}