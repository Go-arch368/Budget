import { useDispatch} from "react-redux"
import { removeCategory } from "../slices/categories-slice"
import { assignEditId } from "../slices/categories-slice"
export default function CategoryItem({_id,name}){
    const dispatch = useDispatch()
    function handleRemove(){
        const confirm = window.confirm("are you sure?")
        if(confirm){
            dispatch(removeCategory(_id))
        }
    }

    function handleEdit(){
        dispatch(assignEditId(_id))
    }
    return(
        <div>
         <li>{name}<button onClick={handleEdit}>edit</button><button onClick={handleRemove}>remove</button></li>
        </div>
    )
}