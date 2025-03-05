const express=require("express");
const app=express()
const {checkSchema}=require("express-validator")
const port = 3999
const cors=require("cors")
const configureDB=require("./config/db")
const categoriesCltr=require("./app/controllers/categories-cltr")
const expensemodel=require("./app/controllers/expense-cltr")
const idvalidationSchema=require("./app/validators/id-schema-validation")
const categoryValidationSchema=require("./app/validators/categoryvalidationschema")
const expenseValidationSchema=require("./app/validators/expensevalidationschema")

configureDB()

app.use(express.json())
app.use(cors())

app.get("/api/categories",categoriesCltr.list)
app.get("/api/categories/:id",checkSchema(idvalidationSchema),categoriesCltr.show)
app.get("/api/expenses",expensemodel.list)
app.get("/api/expenses/:id",checkSchema(idvalidationSchema),expensemodel.show)
app.post("/api/expenses",checkSchema(expenseValidationSchema),expensemodel.create)
app.put("/api/expenses/:id",checkSchema(expenseValidationSchema),expensemodel.update)
app.delete("/api/expenses/:id",checkSchema(idvalidationSchema),expensemodel.delete)
app.post("/api/create-category",checkSchema(categoryValidationSchema),categoriesCltr.create)
app.put("/api/update-category/:id",checkSchema(categoryValidationSchema),checkSchema(idvalidationSchema),categoriesCltr.update)
app.delete("/api/remove-category/:id",checkSchema(idvalidationSchema),categoriesCltr.delete)

app.listen(port,()=>{
    console.log("successfully created",port)
})