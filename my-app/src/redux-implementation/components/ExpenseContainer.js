import { useDispatch,useSelector } from "react-redux"
import { fetchExpenses } from "../slices/expenses-slice"
import ExpenseList from "./ExpenseList"
import {useEffect} from "react"
import ExpenseForm from "./ExpenseForm"
export default function ExpenseContainer(){
    const {data} = useSelector((state)=>state.expenses)
    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(fetchExpenses())
    },[])
    return(
        <div>
            <h1>This your expense container</h1>
            <h1>Expenses Length - {data.length}</h1>
            <ExpenseList/>
            <ExpenseForm/>
        </div>
    )
}