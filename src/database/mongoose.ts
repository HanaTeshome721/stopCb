import mongoose from "mongoose";

const connctToMongoDb=async()=>{
try{
    await mongoose.connect('mongodb://localhost:27017/stopcgt')

    console.log("connected to db")

}catch(error){
    console.log("error connceting to mongodb",error)
}

}