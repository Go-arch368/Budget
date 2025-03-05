import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCategories } from "../slices/categories-slice"
import CategoriesLists from "./CategoriesLists"
import CategoriesForm from "./CategoriesForm"
export default function CategoriesContainer(){
    const dispatch = useDispatch()
    const {data} = useSelector((state)=>state.categories)
   useEffect(()=>{
        dispatch(fetchCategories())
   },[])
   return(
    <div>
        <h1>Redux Categories</h1>
        <h1>Listing Categories-{data.length}</h1>
        <CategoriesLists/>
        <CategoriesForm/>
    </div>
   )
}