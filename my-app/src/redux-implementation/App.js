import CategoriesContainer from "./components/CategoriesContainer"
import ExpenseContainer from "./components/ExpenseContainer"
export default function App(){
    return(
        <div>
           <h1>Redux</h1>
           <CategoriesContainer/>
           <ExpenseContainer/>
        </div>
    )
}