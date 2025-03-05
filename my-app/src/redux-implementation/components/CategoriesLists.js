import { useSelector } from "react-redux"
import CategoryItem from "./CategoryItem"
export default function CategoriesLists(){
    const {data} = useSelector((state)=>state.categories)
    console.log(data)
    return(
        <div>
            <ul>
              {data.map((ele)=>{
                return <CategoryItem key={ele._id} {...ele}/>
              })}
            </ul>
        </div>
    )
}