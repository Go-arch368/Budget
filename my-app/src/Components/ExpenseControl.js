
export default function ExpenseControl({sorting,handleValues,categories,filtering,handleFilter}){
  
    return(
       <div>
           <select value={sorting} onChange={handleValues}>
    
                <option value="ascending">ascending</option>
                <option value="descending">descending</option>
           </select>
  
         {/*  <select value={filtering} onChange={handleFilter}>
              <option value="sort">filter</option>
              {categories.map(ele=>{
                  return <option value={ele._id}>{ele.name}</option>
              })}
          </select> */}
         
       </div>
    )
}