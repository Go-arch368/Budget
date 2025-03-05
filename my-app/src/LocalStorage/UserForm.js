import {useState,useEffect} from "react"
export default function UserForm(){
    const [form,setForm]=useState(JSON.parse(localStorage.getItem("form"))||{
        name:"",
        Email:"",
        age:""
    })

    const handleSubmit=(e)=>{
          e.preventDefault()
    }
  
    useEffect(()=>{
     localStorage.setItem("form",JSON.stringify(form))
    },[form])
    return(
      <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/><br/>
            <label htmlFor="mail">E-mail</label>
            <input type="email" id="name" value={form.Email} onChange={(e)=>setForm({...form,Email:e.target.value})}/><br/>
            <label htmlFor="age">Age</label>
            <input type="number" id="age" value={form.age} onChange={(e)=>setForm({...form,age:e.target.value})}/><br/>
            <button onClick={()=>window.location.reload()}>Reload</button>
        </form>
      </div>  
    )
}