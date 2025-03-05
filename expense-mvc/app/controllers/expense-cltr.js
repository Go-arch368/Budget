const Expense=require("../models/expense-model")
const {validationResult}=require("express-validator")
const expensemodel={}

expensemodel.list=async(req,res)=>{
    try{
      const expenses= await Expense.find()
      res.json(expenses)
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:"something went wrong"})
    }
}

expensemodel.show=async(req,res)=>{

  const errors=validationResult(req)
  if(!errors.isEmpty()){
     return res.status(400).json({error:errors.array()})
  }

  try{
    const id = req.params.id;
   const expenses=await Expense.findById(id)
    
      if(!expenses){
        return res.status(404).json({error:"record not found"})
      }
        res.json(expenses)
    }
  catch(err){
      res.status(500).json({error:"something not found"})
  }
}

expensemodel.create=async(req,res)=>{

  const errors=validationResult(req)
  if(!errors.isEmpty()){
     return res.status(400).json({error:errors.array()})
  }
  try{
    const body=req.body;
    const expenses=await Expense.create(body)
        res.status(201).json(expenses)
  }
 catch(err){
   console.log(err)
    res.status(500).json({error:"something went wrong"})
 } 
  }
  


expensemodel.update=async(req,res)=>{

  const errors= validationResult(req)
  if(!errors.isEmpty()){
     return res.status(400).json({error:errors.array()})
  }
  try{
    const id = req.params.id;
    const body=req.body;
   const expenses= await Expense.findByIdAndUpdate(id,body,{new:true,runValidators:true})
      if(!expenses){
        return res.status(404).json("something went wrong")
      }
        res.json(expenses)
    } 
  catch(err){
    res.status(500).json({error:"something went wrong"})
  }
}

expensemodel.delete=async(req,res)=>{
  const id = req.params.id;

  try{
   const expenses = await Expense.findByIdAndDelete(id)
    if(!expenses){
     return  res.status(404).json("record not found")
    }
    res.json(expenses)
  }
  catch(err){
    res.status(500).json({error:"something went wrong"})
  }
  }
 


module.exports=expensemodel