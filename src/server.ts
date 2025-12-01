import express ,{Request,Response} from "express";

const app=express()

app.get('/hi',(req:Request,res:Response)=>{
    res.send("hello render")
})

app.listen(3000,()=>{
    console.log("server is running")
})