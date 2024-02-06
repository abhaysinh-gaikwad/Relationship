const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {productRouter}=require("./routes/product.routes")

const app=express()
app.use(express.json())
app.use("/users",userRouter)
app.use("/products",productRouter)

app.get("/",(req,res)=>{
    res.setHeader("Content-type","text/html")
    res.send("<h1>This is the Home Page</h1>")
})

app.listen(4500,async()=>{
    try{
        await connection
        console.log("Server is running at port 4500")
        console.log("Connected to the DB")
    } catch(err){
        console.log(err)
    }
})