import CategoryItem from "./CategoryItem"
import CategoryContext from "../Context/CategoryContext"
import { useContext } from "react"
export default function CategoryList(){
    const {categories}=useContext(CategoryContext)
    return(
        <div>
             <h1>Category List</h1>
            <h2>CategoryList Length - {categories.data.length}</h2>
            <ul>
               {categories.data.map((ele)=>{
                return <CategoryItem key={ele._id} 
                                     name={ele.name}
                                     _id={ele._id}
                                 
                                     />
               })} 
            </ul> 

        </div>
    )
}