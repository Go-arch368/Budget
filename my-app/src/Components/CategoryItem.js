import axios from "axios"
import CategoryContext from "../Context/CategoryContext"
import { useContext } from "react"
export default function CategoryItem({_id,name}){
         const{categoryDispatch,expensesDispatch,expenses}=useContext(CategoryContext)
     
    function removeElement(){
        const confirmdelete=window.confirm("Are you sure?")
        if(confirmdelete){
            axios.delete(`http://localhost:3999/remove-category/${_id}`)
            .then((response)=>{
                const result=response.data._id
                console.log(result)
                categoryDispatch({type:"remove_category",payload:result})
                expensesDispatch({type:"filter_expenses",
                    payload:expenses.data.filter((ele)=>ele.category!==result)})
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    return(
        <div>
            <li key={_id}> {name} <button onClick={removeElement}>remove</button></li>
        </div>
    )
}