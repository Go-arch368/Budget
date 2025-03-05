import {useEffect, useState} from "react"
export default function UserInfo(){
    const [data,setData]=useState({})
   useEffect(()=>{
     setData(JSON.parse(localStorage.getItem("form")))    
   },[])
   console.log(data)
    return(
        <div>
             <p>Name:{data.name}</p>
             <p>Email:{data.Email}</p>
             <p>Age:{data.age}</p>
        </div>
    )
}