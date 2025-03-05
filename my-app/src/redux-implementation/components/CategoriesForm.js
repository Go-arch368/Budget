import {useState,useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import { addCategory } from "../slices/categories-slice";
import { updateCategory } from "../slices/categories-slice";
export default function CategoriesForm() {
  const dispatch = useDispatch()
  const {serverErrors,data,editId} = useSelector((state)=>state.categories)
  const [name, setName] = useState("");
  const [clientErrors, setClientErrors] = useState({});

  const errors = {};

  const runClientValidations = () => {
    if (name.trim().length === 0) {
      errors.name = "The name field should not be empty";
    } else if (name.trim().length < 3 || name.trim().length > 20) {
      errors.name = "Name should be between 3-20 characters long";
    }
    return errors;
  };

  function resetForm(){
     setName("")
  }

  useEffect(()=>{
    if(editId){
       const category = data.find((ele)=>ele._id===editId)
       setName(category.name)
    }
  },[editId,data])

  function handleSubmit(e) {
    e.preventDefault();
    const formData = { name };
    console.log(name)
    const validationErrors = runClientValidations();

    if (Object.keys(validationErrors).length !== 0) {
      setClientErrors(validationErrors);
    } else {
      setClientErrors({});
      if(editId){
        dispatch(updateCategory({formData,editId,resetForm}))
      }
      else{
        dispatch(addCategory({formData,resetForm}))
      }
    }
  }

  return (
    <div>
      <h2>{editId?"Edit":"Add"} Category</h2>
     
    
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Enter category"
        />
        {clientErrors.name && <span style={{ color: "red" }}>{clientErrors.name}</span>}
        <br />
        {serverErrors && (
        <div>
          <ul>
            {serverErrors.map((err, i) => (
              <p key={i} style={{color:"red"}}>{err.msg}</p>
            ))}
          </ul>
        </div>
      )} 
        <input type="submit" />
      </form>
    </div>
  );
}
