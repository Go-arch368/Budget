const Category=require('../models/category-model')
const {validationResult}=require('express-validator')
const categoriesCltr={}

categoriesCltr.list=async(req,res)=>{

     try{
      const categories=await Category.find()
      res.json(categories)
     }
     catch(err){
       console.log(err)
       res.status(500).json({error:"something went wrong"})
     }
    
    /*model constructor Category.find()  
     .then((category)=>{
      res.json(category)
     })
     .catch((err)=>{
       console.log(err);
       res.status(500).json({error:"something went wrong"})
     }) */
  }

 categoriesCltr.show=async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({error:errors.array()})
    }
      const id=req.params.id;
    try{
      const categories=await Category.findById(id)
       if(!categories){
        return res.status(404).json({error:"something went wrong"})
       }
       res.json(categories)
    }
    catch(err){
       console.log(err)
       res.status(500).json({error:"something went wrong"})
    }
   /* await Category.findById(id)
      .then((category)=>{
         if(!category){
          res.status(404).json({error:"record not found"})
         }
         else{
          res.json(category)
         }
      })
      .catch((err)=>{
        res.json({error:"something went wrong"})
      }) */
  }

  categoriesCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
         return res.status(400).json({error:errors.array()})
    }
     const body=req.body
     try{
      const categories=await Category.create(body)
     res.status(201).json(categories);
     }
     catch(err){
      console.log(err)
      res.status(500).json({error:"something went wrong"})
     }
     }
   
  

categoriesCltr.update=async(req,res)=>{

  const errors=validationResult(req)
  if(!errors.isEmpty()){
     return res.status(400).json({error:errors.array()})
  }

  const id = req.params.id;
  const body=req.body;
  try{
   const categories=await Category.findByIdAndUpdate(id,body,{new:true,runValidators:true})
         if(!categories){
          return  res.status(400).json({error:"record not found"})
         }
          res.json(categories) 
  }
  catch(err){
    console.log(err)
    res.status(500).json({error:"something went wrong"})
  }
}


categoriesCltr.delete=async(req,res)=>{

  const errors=validationResult(req)
  if(!errors.isEmpty()){
     return res.status(400).json({error:errors.array()})
  }

  try{
    const id = req.params.id;
    const categories= await Category.findByIdAndDelete(id)
      if(!categories){
       return res.status(404).json({error:"file not found"})
      }
      res.json(categories)
  }
  catch(error){
    res.status(500).json({error:"something went wrong"}) 
   }
}
  
module.exports=categoriesCltr


