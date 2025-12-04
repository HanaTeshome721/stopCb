// import express ,{Request,Response} from "express";
// import connctToMongoDb from "./database/mongoose";
// const app=express()

// app.get('/hi',(req:Request,res:Response)=>{
//     res.send("hello render")
// })

// app.listen(3000,()=>{
//     console.log("server is running")
// })


import app from "./app";
import connctToMongoDb from "./database/mongoose";
connctToMongoDb()
app.listen(3000,()=>{
    console.log(`server is running ${3000}`)
})