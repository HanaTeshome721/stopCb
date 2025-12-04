import User from '../database/models/usermodel'
import { Request,Response } from 'express'
//get all user

export const getAlluser =async (req:Request,res:Response)=>{
 try{
    const users= await User.find()
    res.json(users)
 }catch(error){
    res.status(500).json({error:'failed to fetch workouts'})
 }

}



export const createUser= async(req:Request,res:Response)=>{
    try{
        const {personal_info,smoking_profile,goals,settings,} =req.body

        //validate
        if(!personal_info?.email || !personal_info.username){
            return res.status(400).json({
                message :" Email and username are required "
            });
        }

        //duplicate email
        const exist =await User.findOne({
            "personal_info.email":personal_info.email,
        });

        if(exist){
            return res.status(400).json({ message:"Email already registered"})
        }

        const newUser= new User({
            personal_info,
            smoking_profile,
            goals,
            settings,
            created_at: new Date(),
            last_active: new Date(),
            sessions: [],
            preference: [],
        })

        await newUser.save();
        res.status(201).json({
            message:"User registered successfully",
            user:newUser,
        })
    }catch(error){console.log("registration error",error);
        res.status(500).json({
            message:"server error" ,error
        })
    }
}


